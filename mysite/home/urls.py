from django.urls import path
from . import views

urlpatterns = [
    path("", views.home_page, name="home_page"),
    path("login/", views.login_page, name="login_page"),
    path("register/", views.register_page, name="register_page"),
    path('logout/', views.logout_page, name='logout_page'),
    path('dashboard/', views.dashboard_page, name='dashboard_page'),

    path('dashboard/<str:sitename>/', views.edit_page, name='edit_page_home_page'),
    path('dashboard/<str:sitename>/<str:page_name>/', views.edit_page, name='edit_page'),
]
