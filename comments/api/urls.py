from django.conf.urls import url
from .views import CommentListAPIView, CommentDetailDestroyAPIView, CommentCreateAPIView


urlpatterns = [
    url(r'^$', CommentListAPIView.as_view(), name='comment_list'),
    url(r'(?P<pk>\d+)/$', CommentDetailDestroyAPIView.as_view(), name='comment_detail'),
    url(r'create/$', CommentCreateAPIView.as_view(), name='comment_create'),


]