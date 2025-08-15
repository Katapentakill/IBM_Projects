"""
URL configuration for bandsite project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    
    # URLs para canciones
    path('songs/', views.songs_list, name='songs_list'),
    path('songs/<int:song_id>/', views.song_detail, name='song_detail'),
    path('songs/create/', views.song_create, name='song_create'),
    path('songs/<int:song_id>/edit/', views.song_update, name='song_update'),
    path('songs/<int:song_id>/delete/', views.song_delete, name='song_delete'),  # ← AGREGAR ESTA LÍNEA
    
    # URLs para fotos
    path('photos/', views.photos_list, name='photos_list'),
    path('photos/<int:photo_id>/', views.photo_detail, name='photo_detail'),
    path('photos/create/', views.photo_create, name='photo_create'),
    path('photos/<int:photo_id>/edit/', views.photo_update, name='photo_update'),
    path('photos/<int:photo_id>/delete/', views.photo_delete, name='photo_delete'),  # ← AGREGAR ESTA LÍNEA
]

# Servir archivos media en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)