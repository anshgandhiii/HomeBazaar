from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from account.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer,ProductSerializer
from rest_framework import status,viewsets
from account.serializers import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer,UserChangePasswordSerializer,SendPasswordResetEmailSerializer,UserPasswordResetSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Consumer
from .serializers import ConsumerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Product

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
    def post(self, request,format=None):
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            user=authenticate(email=email,password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':token,'msg':'Login Success'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or Password is invalid']}},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
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


from rest_framework.decorators import api_view
from .models import User  # Import the User model

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate the user
    user = authenticate(email=email, password=password)

    if user is not None:
        # If authentication is successful, fetch the user from the database
        try:
            user_data = User.objects.get(email=email)
            # Return the user's role and other necessary information
            return Response({
                'email': user_data.email,
                'role': user_data.role  # This is the role field from your model
            })
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=404)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)


