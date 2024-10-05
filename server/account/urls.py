from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from account.views import (
    UserRegistrationView,
    UserLoginView,
    UserProfileView,
    UserChangePasswordView,
    SendPasswordResetEmailView,
    UserPasswordResetView
)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import ConsumerViewSet,OrderViewSet,ProductViewSet, ClaimRewardView, RewardsViewSet

router = DefaultRouter()

router.register(r'consumers', ConsumerViewSet)
<<<<<<< HEAD
from .views import ProductViewSet

=======
>>>>>>> 2b7eaff29604601bb9d276f44df736d082c2752e
router.register(r'products', ProductViewSet)
router.register(r'rewards', RewardsViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('claim_reward/', ClaimRewardView.as_view(), name='claim_reward'),
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('login/',UserLoginView.as_view(),name='login'),
    path('profile/',UserProfileView.as_view(),name='profile'),
    path('changepassword/',UserChangePasswordView.as_view(),name='changepassword'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(),name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/',UserPasswordResetView.as_view(),name='reset-password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
<<<<<<< HEAD
=======
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
>>>>>>> 2b7eaff29604601bb9d276f44df736d082c2752e
]

