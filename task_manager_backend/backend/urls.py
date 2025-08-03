from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # Include the URLs from your 'tasks' app at /api/tasks/
    path('api/', include('tasks.urls')),
    # JWT Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # For login - get access and refresh tokens
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # To refresh access token
]
