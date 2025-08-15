from django.contrib import admin
from .models import Song

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ['title', 'artist', 'album', 'genre', 'year', 'duration', 'created_at']
    list_filter = ['genre', 'year', 'artist', 'created_at']
    search_fields = ['title', 'artist', 'album', 'lyrics']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'artist', 'album')
        }),
        ('Detalles', {
            'fields': ('genre', 'year', 'duration')
        }),
        ('Contenido', {
            'fields': ('lyrics',)
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.order_by('-created_at')