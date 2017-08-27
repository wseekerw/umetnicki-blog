from rest_framework import serializers

from comment_replies.models import CommentReply
from accounts.user_api.serializers import UserSerializer
from comments.models import Comment


class CommentReplySerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = CommentReply
        fields = (
            'id',
            'user',
            'content',
            'timestamp',
            'comment'

        )

class CommentReplyCreateSerializer(serializers.ModelSerializer):
    comment = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all())
    class Meta:
        model = CommentReply
        fields = (
            'content',
            'comment'
        )