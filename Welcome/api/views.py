from rest_framework.generics import ListAPIView

from Welcome.models import Welcome
from .serializers import WelcomeSerializer


class WelcomeListAPIView(ListAPIView):
    queryset = Welcome.objects.all()
    serializer_class = WelcomeSerializer

