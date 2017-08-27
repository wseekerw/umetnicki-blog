from rest_framework import serializers

from comments.models import Comment
from accounts.user_api.serializers import UserSerializer
from Posts.models import Post
from comment_replies.api.serializers import CommentReplySerializer

from comment_replies.models import CommentReply

replies = CommentReply.objects.all()


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comment_replies_on_comments = CommentReplySerializer(replies, many=True)
    class Meta:
        model = Comment
        fields = [
            'id',
            'content',
            'timestamp',
            'user',
            'post',

            'comment_replies_on_comments'
        ]



class CommentCreateSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())
    class Meta:
        model = Comment
        fields = [
            #'id',
            'content',
            #'timestamp',
            #'user',
            'post',



        ]







