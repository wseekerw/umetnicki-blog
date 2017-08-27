from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField


from Posts.models import Post
from accounts.user_api.serializers import UserSerializer
from comments.api.serializers import CommentSerializer





class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comments = CommentSerializer(many=True)
    class Meta:
        model = Post
        fields = [
            'title',
            'id',
            'user',
            'content',
            'image',
            'timestamp',
            'comments'
        ]

class PostCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            #'id',
            'title',
            'content',
            'image',
            #'timestamp'
        ]








