from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import ListView, DetailView
from songs.models import Song
from photos.models import Photo
import json

def home(request):
    """Vista principal del sitio de la banda"""
    featured_photos = Photo.objects.filter(is_featured=True)[:6]
    latest_songs = Song.objects.all()[:5]
    
    context = {
        'featured_photos': featured_photos,
        'latest_songs': latest_songs,
        'total_songs': Song.objects.count(),
        'total_photos': Photo.objects.count(),
    }
    return render(request, 'home.html', context)

def songs_list(request):
    """Vista para listar todas las canciones"""
    songs = Song.objects.all()
    paginator = Paginator(songs, 10)  # 10 canciones por página
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'songs': page_obj,
    }
    return render(request, 'songs/list.html', context)

def song_detail(request, song_id):
    """Vista para mostrar detalles de una canción"""
    song = get_object_or_404(Song, id=song_id)
    return render(request, 'songs/detail.html', {'song': song})

@csrf_exempt
def song_create(request):
    """Vista para crear una nueva canción"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            song = Song.objects.create(
                title=data.get('title'),
                artist=data.get('artist'),
                album=data.get('album'),
                lyrics=data.get('lyrics'),
                genre=data.get('genre', 'Unknown'),
                year=data.get('year'),
                duration=data.get('duration', 'Unknown')
            )
            return JsonResponse({
                'success': True,
                'message': 'Canción creada exitosamente',
                'song_id': song.id
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
    
    return render(request, 'songs/create.html')

@csrf_exempt
def song_update(request, song_id):
    """Vista para actualizar una canción"""
    song = get_object_or_404(Song, id=song_id)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            song.title = data.get('title', song.title)
            song.artist = data.get('artist', song.artist)
            song.album = data.get('album', song.album)
            song.lyrics = data.get('lyrics', song.lyrics)
            song.genre = data.get('genre', song.genre)
            song.year = data.get('year', song.year)
            song.duration = data.get('duration', song.duration)
            song.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Canción actualizada exitosamente'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
    
    return render(request, 'songs/edit.html', {'song': song})

def song_delete(request, song_id):
    """Vista para eliminar una canción"""
    song = get_object_or_404(Song, id=song_id)
    
    if request.method == 'POST':
        song.delete()
        messages.success(request, f'La canción "{song.title}" fue eliminada exitosamente.')
        return redirect('songs_list')
    
    return render(request, 'songs/delete.html', {'song': song})

def photos_list(request):
    """Vista para listar todas las fotos"""
    photos = Photo.objects.all()
    paginator = Paginator(photos, 12)  # 12 fotos por página
    
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'page_obj': page_obj,
        'photos': page_obj,
    }
    return render(request, 'photos/list.html', context)

def photo_detail(request, photo_id):
    """Vista para mostrar detalles de una foto"""
    photo = get_object_or_404(Photo, id=photo_id)
    return render(request, 'photos/detail.html', {'photo': photo})

@csrf_exempt
def photo_create(request):
    """Vista para crear una nueva foto"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            photo = Photo.objects.create(
                pic_url=data.get('pic_url'),
                event_country=data.get('event_country'),
                event_state=data.get('event_state'),
                event_city=data.get('event_city'),
                event_date=data.get('event_date'),
                description=data.get('description', ''),
                photographer=data.get('photographer', ''),
                is_featured=data.get('is_featured', False)
            )
            return JsonResponse({
                'success': True,
                'message': 'Foto creada exitosamente',
                'photo_id': photo.id
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
    
    return render(request, 'photos/create.html')

@csrf_exempt
def photo_update(request, photo_id):
    """Vista para actualizar una foto"""
    photo = get_object_or_404(Photo, id=photo_id)
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            photo.pic_url = data.get('pic_url', photo.pic_url)
            photo.event_country = data.get('event_country', photo.event_country)
            photo.event_state = data.get('event_state', photo.event_state)
            photo.event_city = data.get('event_city', photo.event_city)
            photo.event_date = data.get('event_date', photo.event_date)
            photo.description = data.get('description', photo.description)
            photo.photographer = data.get('photographer', photo.photographer)
            photo.is_featured = data.get('is_featured', photo.is_featured)
            photo.save()
            
            return JsonResponse({
                'success': True,
                'message': 'Foto actualizada exitosamente'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
    
    return render(request, 'photos/edit.html', {'photo': photo})

def photo_delete(request, photo_id):
    """Vista para eliminar una foto"""
    photo = get_object_or_404(Photo, id=photo_id)
    
    if request.method == 'POST':
        photo.delete()
        messages.success(request, f'La foto de {photo.get_location()} fue eliminada exitosamente.')
        return redirect('photos_list')
    
    return render(request, 'photos/delete.html', {'photo': photo})
