from django.http import JsonResponse


class JsonResponseMixin(object):

    def get_data(self, context):
        return context

    def render_to_json_response(self, context, **response_kwargs):
        return JsonResponse(self.get_data(context), **response_kwargs)
