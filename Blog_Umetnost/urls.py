"""Blog_Umetnost URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from accounts.user_api import urls as user_api_urls
from Posts.views import home
from Posts.api import urls as post_api_urls
from comments.api import urls as comment_api_urls
from comment_replies.api import urls as comment_replies_api_urls
from Welcome.api import urls as welcome_api_urls

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', home, name='home'),

    # api
    url(r'^api/users/', include(user_api_urls, namespace='api_users')),
    url(r'^api/posts/', include(post_api_urls, namespace='api_posts')),
    url(r'^api/comments/', include(comment_api_urls, namespace='api_comments')),
    url(r'^api/comment_replies/', include(comment_replies_api_urls, namespace='comment_replies_api')),
    url(r'^api/welcome_list/', include(welcome_api_urls, namespace='welcome_api')),

    # api auth
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url('api/auth/token', obtain_jwt_token),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

