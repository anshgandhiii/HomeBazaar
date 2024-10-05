from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.exceptions import ValidationError
import re

class UserManager(BaseUserManager):
    def create_user(self, email, name, password=None, role=None):
        """
        Creates and saves a User with the given email, name, tc, role, and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            role=role,  # Set the role when creating the user
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, role=None , password=None):
        """
        Creates and saves a superuser with the given email, name, tc, and password.
        """
        user = self.create_user(
            email=email,
            name=name,
            password=password,
            role='seller',  # Superusers will default to the seller role
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    ROLE_CHOICES = [
        ('seller', 'Seller'),
        ('consumer', 'Consumer'),
    ]

    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_subscribed = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='consumer')  # Added role field with default
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return self.is_admin or self.is_subscribed

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

class Consumer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='consumer_profile')
    shipping_address = models.TextField()
    phone_number = models.CharField(max_length=20, unique=True)
    age = models.PositiveIntegerField()  # Added field for age
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])  # Added field for gender
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
    
    def clean(self):
        phone_regex = re.compile(r'^\+\d{1,2} \d{10}$')  # Allows + followed by 1-2 digits and 10 digits after a space
        if not phone_regex.match(self.phone_number):
            raise ValidationError('Phone number must be in the format "+XX XXXXXXXXXX", where XX is the country code and XXXXXXXXXX is the 10-digit number.')

    def save(self, *args, **kwargs):
        self.clean()
        super(Consumer, self).save(*args, **kwargs)
