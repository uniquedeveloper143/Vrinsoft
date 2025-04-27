from rest_framework import viewsets, mixins
from demo_test.my_app.models import Image, ImageDetails
from demo_test.my_app.serializers import ImageSerializer, ImageDetailsListSerializer, ImageDetailsSerializer
from rest_framework import permissions
from demo_test.utils.permissions import IsAPIKEYAuthenticated


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    permission_classes = [permissions.IsAuthenticated, IsAPIKEYAuthenticated]

    def get_queryset(self):
        return Image.objects.all().order_by('-id')


class ImageDetailsCreateViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = ImageDetails.objects.all()
    serializer_class = ImageDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, IsAPIKEYAuthenticated]


class ImageDetailsViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageDetailsListSerializer
    permission_classes = [permissions.IsAuthenticated, IsAPIKEYAuthenticated]