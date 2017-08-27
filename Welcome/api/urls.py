from django.conf.urls import url
from .views import WelcomeListAPIView


urlpatterns = [
    url(r'^$', WelcomeListAPIView.as_view(), name='welcome_list'),

]