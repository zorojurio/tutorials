from django.shortcuts import render
from django.utils.translation import gettext, activate, get_language

from posts.models import Post


def home(request):
    trans = tranlate('fr')
    return render(request, template_name='posts/home.html', context={'trans': trans})


def item(request):
    posts = Post.objects.all()
    context = {
        "hello": gettext('hello'),
        "posts": posts
    }
    return render(request, template_name='posts/item.html', context=context)


def tranlate(language):
    current_language = get_language()
    try:
        activate(language)
        text = gettext('hello')
    finally:
        activate(current_language)
    return text

