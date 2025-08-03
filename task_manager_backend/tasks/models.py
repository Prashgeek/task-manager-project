from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)  # auto_now_add sets on creation
    updated_at = models.DateTimeField(auto_now=True)      # auto_now updates every save

    def __str__(self):
        return self.title
