from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.exceptions import ValidationError
import re
from decimal import Decimal

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

class Rewards(models.Model):
    STATUS_CHOICES = [
        ('gained', 'Gained'),
        ('get', 'Get'),
    ]

    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='rewards/')
    coins_required = models.PositiveIntegerField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return self.name

class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_profile')
    total_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_orders = models.PositiveIntegerField(default=0)
    rewards = models.ManyToManyField(Rewards, blank=True)
    coins = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.email

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('handicrafts', 'Handicrafts'),
        ('food', 'Food'),
        ('toys', 'Toys'),
        ('fashion', 'Fashion'),
        ('accessories', 'Accessories'),
        ('furniture', 'Furniture'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=255)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='products')
    manufacturer = models.CharField(max_length=255)
    ingredients = models.TextField()
    life_span = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    offers = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    customer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        # Calculate total price
        if self.discounted_price:
            self.total = self.discounted_price * self.quantity
        else:
            self.total = self.price * self.quantity
        super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} by {self.customer.email}"



