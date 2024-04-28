from rest_framework import serializers
from .models import Questionnaire


class Serializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['territory', 'age', 'category', 'services_of_interest']
