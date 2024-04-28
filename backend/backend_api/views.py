from django.shortcuts import render
from rest_framework.views import APIView
from .models import Questionnaire
from .serializer import Serializer
from rest_framework.response import Response
from .database import suitable_services


class QuestionnaireView(APIView):
    def get(self, request):
        output = [
            {
                "territory": output.territory,
                "age": output.age,
                "category": output.category,
                "services_of_interest": output.services_of_interest
            } for output in Questionnaire.objects.all(flat=True)
        ]
        Questionnaire.objects.all().delete()
        return Response(output)

    def post(self, request):
        serializer = Serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response(suitable_services(serializer.data))
