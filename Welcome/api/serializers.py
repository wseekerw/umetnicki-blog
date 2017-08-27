from rest_framework import serializers

from Welcome.models import Welcome


class WelcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Welcome
        fields = [
            'content'
        ]