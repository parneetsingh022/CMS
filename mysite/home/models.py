from django.db import models
from django.conf import settings

class Dashboard(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    project_id = models.IntegerField()
    element = models.CharField(max_length=50)
    element_id = models.CharField(max_length=50)
    position = models.IntegerField()

    def __str__(self):
        return f'{self.username} - {self.element}'


class UserSite(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sitename = models.CharField(max_length=50)

    class Meta:
        unique_together = ('user', 'sitename')

    def __str__(self):
        return f'{self.user.username} - {self.sitename}'