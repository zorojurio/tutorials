from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect


class CSRFExemptMixin(object):
    @method_decorator(csrf_protect)
    def dispath(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

