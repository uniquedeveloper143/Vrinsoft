from django.db import models
from django.utils.translation import gettext_lazy as _
from demo_test.utils.utils import get_title_photo_random_filename


class Image(models.Model):
    title = models.CharField(_('title'), max_length=128, null=True)
    photo = models.ImageField(upload_to=get_title_photo_random_filename, null=True)

    class Meta:
        verbose_name = 'Image'
        verbose_name_plural = _('Images')

    def __str__(self):
        return f'{self.title}'


class ImageDetails(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE,  related_name='image_details')
    name = models.CharField(_('name'), max_length=128, blank=True, null=True,)
    total_count = models.IntegerField(_('Total count'), default=0, null=True)


    class Meta:
        verbose_name = 'ImageDetails'
        verbose_name_plural = _('ImageDetails')

    def __str__(self):
        return f'{self.name}'

