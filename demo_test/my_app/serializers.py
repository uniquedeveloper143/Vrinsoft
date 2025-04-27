from rest_framework import serializers
from demo_test.my_app.models import Image,ImageDetails
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError
from demo_test.utils.comman import count_objects


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'title', 'photo')

    extra_kwargs = {
        "title": {"required": True},
        "photo": {"required": True},
    }

    def validate(self, attrs):
        if not attrs.get('title'):
            raise ValidationError(_("title field is required."))

        if not attrs.get('photo'):
            raise ValidationError(_("photo field is required."))

        return super().validate(attrs)

    def create(self, validated_data):
        instance = super().create(validated_data)
        # import pdb;pdb.set_trace()
        objects_details = count_objects(instance.photo.path)
        # print("*"*44)
        # print(instance.photo.url)
        # print(instance.photo.path)
        # print(objects_details)
        for key, value  in objects_details.items():
            ImageDetails.objects.create(image=instance, name=key, total_count=value)

        return instance


class ImageDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ImageDetails
        fields = ('id', 'image', 'name', 'total_count',)

        extra_kwargs = {
            'image': {'write_only': True},
        }

    def validate(self, attrs):
        if not attrs.get('name'):
            raise ValidationError(_("name field is required."))

        if not attrs.get('total_count'):
            raise ValidationError(_("total_count field is required."))

        return super().validate(attrs)


class ImageDetailsListSerializer(serializers.ModelSerializer):
    photo_detail = ImageDetailsSerializer(source='image_details', read_only=True, many=True)

    class Meta:
        model = Image
        fields = ('id', 'title', 'photo', 'photo_detail')

        extra_kwargs = {
            'photo_detail': {'write_only': True},
        }
        read_only_fields = ('photo_detail',)