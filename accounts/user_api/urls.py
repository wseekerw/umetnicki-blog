from django.conf.urls import url, include
from rest_framework import routers
from .views import UserListAPIView, UserCreateAPIView, UserLoginAPIView, UserDetailAPIView



urlpatterns = [
    url(r'^$', UserListAPIView.as_view(), name='user_list'),
    url(r'login/$', UserLoginAPIView.as_view(), name='user_login'),
    url(r'create/$', UserCreateAPIView.as_view(), name='user_create'),
    url(r'(?P<pk>\d+)/$', UserDetailAPIView.as_view(), name='user_detail'),
]



