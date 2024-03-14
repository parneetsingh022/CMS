from rest_framework import serializers
from home.models import UserSite

class UserSiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSite
        fields = ['id', 'user', 'sitename']