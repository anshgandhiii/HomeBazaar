from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from account.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer,ProductSerializer,OrderSerializer
from rest_framework import status,viewsets
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Consumer,Order,Product
from .serializers import ConsumerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from .serializers import ConsumerSerializer,RewardsSerializer
from .models import Product,Rewards

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes=[UserRenderer]
    def post(self, request,format=None):
        serializer=UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            token=get_tokens_for_user(user)
            return Response({'token':token,'msg':'Registration Success'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        return Response({"message": "This is the user registration endpoint. Use POST to register."}, status=status.HTTP_200_OK)
    
class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                # Add the role to the response
                return Response({
                    'token': token,
                    'role': user.role,  # Include the user's role
                    'msg': 'Login Success'
                }, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or Password is invalid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user}
        )
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SendPasswordResetEmailView(APIView):
    renderer_classes=[UserRenderer]
    def post(self,request,format=None):
        serializer=SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Reset Link Send to Your Email'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserPasswordResetView(APIView):
    renderer_classes=[UserRenderer]
    def post(self, request,uid,token, format=None):
        serializer=UserPasswordResetSerializer(data=request.data,context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password Reset Success'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

        
class ConsumerViewSet(viewsets.ModelViewSet):
    queryset = Consumer.objects.all()
    serializer_class = ConsumerSerializer
    permission_classes = [IsAuthenticated]  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all() 
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'consumer':
            return Order.objects.filter(consumer=user.consumer_profile)
        elif user.role == 'seller':
            return Order.objects.filter(product__seller=user.seller_profile)
        else:
            raise ValidationError("Invalid role for accessing orders.")

    def perform_create(self, serializer):
        user = self.request.user
        print(f"User role: {user.role}")
        print(f"User email: {user.email}")
        print(f"Has consumer profile: {hasattr(user, 'consumer_profile')}")
        
        if user.role != 'consumer':
            raise ValidationError(f"Only consumers can create orders. Current role: {user.role}")
        
        if not hasattr(user, 'consumer_profile'):
            raise ValidationError("User does not have a consumer profile")
        
        serializer.save(consumer=user.consumer_profile)
    
    def update(self, request, *args, **kwargs):
        user = self.request.user
        order = self.get_object()
        if user.role == 'seller' and order.product.seller == user.seller_profile:
            return super().update(request, *args, **kwargs)
        else:
            raise ValidationError("You do not have permission to update this order.")

    def destroy(self, request, *args, **kwargs):
        user = self.request.user
        order = self.get_object()
        if user.role == 'seller' and order.product.seller == user.seller_profile:
            return super().destroy(request, *args, **kwargs)
        else:
            raise ValidationError("You do not have permission to delete this order.")
class RewardsViewSet(viewsets.ModelViewSet):
    queryset = Rewards.objects.all()
    serializer_class = RewardsSerializer

class ClaimRewardView(APIView):
    def post(self, request):
        reward_id = request.data.get('rewardId')
        email = request.data.get('email')
        # Handle reward claiming logic here

        return Response({'message': 'Reward claimed successfully!'}, status=status.HTTP_200_OK)
