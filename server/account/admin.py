from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Consumer,Order,Product,Seller,Rewards,OrderItem  # Import Consumer model

# Custom User Admin
class UserModelAdmin(BaseUserAdmin):
    # Displaying fields in the list view
    list_display = ["id", "email", "name", "is_admin", "is_subscribed", "role"]
    list_filter = ["is_admin", "is_subscribed", "role"]  # Add role to filter options

    # Fields for editing and displaying in the user details view
    fieldsets = [
        ('User Credentials', {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "role"]}),  # Include role here
        ("Permissions", {"fields": ["is_admin", "is_subscribed"]}),
    ]

    # Fields when adding a new user
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide,"],
                "fields": ["email", "name", "role", "password1", "password2"],  # Include role here
            },
        ),
    ]

    search_fields = ["email", "role"]  # You can search by role as well
    ordering = ["email", "id"]
    filter_horizontal = []

admin.site.register(User, UserModelAdmin)

# Custom Consumer Admin
class ConsumerAdmin(admin.ModelAdmin):
    list_display = ['user', 'age', 'gender', 'phone_number', 'shipping_address', 'created_at', 'updated_at']
    search_fields = ['user__email', 'phone_number']  # You can search by email or phone number
    list_filter = ['age', 'gender']  # Filters based on age and gender
    ordering = ['user', 'created_at']

admin.site.register(Consumer, ConsumerAdmin)  # Register Consumer model
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Product)
admin.site.register(Rewards)
admin.site.register(Seller)
