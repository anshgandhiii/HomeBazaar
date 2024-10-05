from rest_framework import serializers
from account.models import User, Consumer,Product, Rewards
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from account.utils import Util
import re

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    role = serializers.ChoiceField(choices=[('seller', 'Seller'), ('consumer', 'Consumer')], required=True)  # Add this line

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2', 'role']  # Include role in fields
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 5},
        }   

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        
        if password != password2:
            raise serializers.ValidationError({'password': 'Password and Confirm Password do not match'})
        
        return attrs
    
    def create(self, validated_data):
        # role = validated_data.pop('role')  # Extract role from validated_data
        # user = User.objects.create_user(**validated_data)  # Create the user without the role first
        # user.role = role  # Set the user's role
        # user.save()  # Save the user with the role
        # return user
        validated_data.pop('password2')  # Remove password2 as it's not needed for creating the user
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            role=validated_data['role'],
            password=validated_data['password']
        )
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=User
        fields=['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','name','email']

class ConsumerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumer
        fields = '__all__'
        read_only_fields = ('coins', 'created_at', 'updated_at')  # Prevent users from directly modifying these fields

    def validate_phone_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value


class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')  

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Password and Confirm Password do not match'}
            )

        user.set_password(password)
        user.save()

        return attrs
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        fields=['email']
    
    def validate(self, attrs):
        email=attrs.get('email')
        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uid=urlsafe_base64_encode(force_bytes(user.id))
            print('encoded uid:',uid)
            token=PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token',token)
            link='http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('pass reset link:',link)
            #email send
            data={
                'subject':'Reset Your Password',
                'body':f'Please use this link to reset your password {link}',
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError({'You are not registered user'})
    
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True
    )

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')  
            token = self.context.get('token')  

            if password != password2:
                raise serializers.ValidationError(
                    {'password': 'Password and Confirm Password do not match'}
                )

            id=smart_str(urlsafe_base64_decode(uid))
            user=User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user,token):
                raise serializers.ValidationError({'token is invalid'})
            
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise serializers.ValidationError({'token is invalid'})

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class RewardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rewards
        fields = ['id', 'name', 'image', 'coins_required', 'status']

    def get_image(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url)
