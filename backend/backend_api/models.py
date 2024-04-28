from django.db import models


class Questionnaire(models.Model):
    territory = models.CharField(max_length=100)
    age = models.CharField(max_length=3)
    category = models.CharField(max_length=100)
    services_of_interest = models.CharField(max_length=1000)
    