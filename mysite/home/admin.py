from django.contrib import admin
from .models import (
    Dashboard,
    UserSite
)

admin.site.register(Dashboard)
admin.site.register(UserSite)