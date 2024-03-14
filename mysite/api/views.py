from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from home.models import UserSite
from .serializers import UserSiteSerializer
import json
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import authentication_classes
from django.middleware.csrf import get_token

@api_view(['POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_data(request):
    print(request.user)
    data = json.loads(request.body)
    username = data.get('username')
    
    user = User.objects.get(username=username)
    user_sites = UserSite.objects.filter(user=user)
    serializer = UserSiteSerializer(user_sites, many=True)
    return Response(serializer.data)


