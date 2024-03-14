from django.urls import path, include
from . import views


urlpatterns = [
    path('<str:username>/<str:sitename>/', views.site_page, name='site_page_home_page'),
    path('<str:username>/<str:sitename>/<str:page>', views.site_page, name='site_page'),
]
