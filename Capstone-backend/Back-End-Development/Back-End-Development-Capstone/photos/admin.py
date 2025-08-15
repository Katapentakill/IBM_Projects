from django.contrib import admin
from .models import Photo

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'event_country', 'event_city', 'event_date', 'photographer', 'is_featured', 'created_at']
    list_filter = ['event_country', 'event_date', 'is_featured', 'created_at']
    search_fields = ['event_city', 'event_state', 'event_country', 'description', 'photographer']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['is_featured']
    
    fieldsets = (
        ('Ubicación del Evento', {
            'fields': ('event_country', 'event_state', 'event_city', 'event_date')
        }),
        ('Imagen', {
            'fields': ('pic_url', 'description')
        }),
        ('Información Adicional', {
            'fields': ('photographer', 'is_featured')
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return queryset.order_by('-event_date', '-created_at')