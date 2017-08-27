from django.conf.urls import url
from .views import CommentReplyListAPIView, CommentReplyDetailAPIView, CommentReplyCreateAPIView


urlpatterns = [
    url(r'^$', CommentReplyListAPIView.as_view(), name='comment_replies_list'),
    url(r'(?P<pk>\d+)/$', CommentReplyDetailAPIView.as_view(), name='comment_replies_detail'),
    url(r'create/$', CommentReplyCreateAPIView.as_view(), name='comment_replies_create')

]