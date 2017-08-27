from rest_framework.generics import ListAPIView, RetrieveDestroyAPIView, CreateAPIView


from comment_replies.models import CommentReply
from .serializers import CommentReplySerializer, CommentReplyCreateSerializer


class CommentReplyListAPIView(ListAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplySerializer


class CommentReplyDetailAPIView(RetrieveDestroyAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplySerializer


class CommentReplyCreateAPIView(CreateAPIView):
    queryset = CommentReply.objects.all()
    serializer_class = CommentReplyCreateSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)