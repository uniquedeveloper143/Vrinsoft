from django.urls import path, include
from rest_framework import routers
from demo_test.my_app import api

router = routers.SimpleRouter()
router.register('image', api.ImageViewSet, basename='image')
router.register('add-image-details', api.ImageDetailsCreateViewSet, basename='add_image_details')
router.register('image-details', api.ImageDetailsViewSet, basename='image_details')

app_name = 'custom-auth'

urlpatterns = [
    path('', include(router.urls)),
]
