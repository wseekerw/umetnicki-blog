from django.conf.urls import url
from .views import PostListAPIView, PostDetailAPIView, PostCreateAPIView, UpdateAPIView


urlpatterns = [
    url(r'^$', PostListAPIView.as_view(), name='post_list'),
    url(r'^create/$', PostCreateAPIView.as_view(), name='post_create'),
    url(r'update/(?P<pk>\d+)/$', UpdateAPIView.as_view(), name='post_edit'),
    url(r'(?P<pk>\d+)/$', PostDetailAPIView.as_view(), name='post_detail'),

]