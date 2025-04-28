from celery import shared_task
import logging
from demo_test.utils.comman import count_objects
from demo_test.my_app.models import ImageDetails, Image

logger = logging.getLogger(__name__)


@shared_task
def detect_objects_task(image_path, _id):
    logger.info("Executing objects detection task")
    objects_details = {}
    try:
        objects_details = count_objects(image_path)
        instance = Image.objects.filter(id=_id).first()
        for key, value  in objects_details.items():
            ImageDetails.objects.create(image=instance, name=key, total_count=value)

        logger.info(f"Executed objects detection task : {objects_details}")
    except Exception as e:
        logger.error(f"Error executing objects detection task: {e}")
    return objects_details