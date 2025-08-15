from django.db import models
from django.core.validators import URLValidator

class Photo(models.Model):
    """Modelo para almacenar información de fotos"""
    
    pic_url = models.URLField(
        validators=[URLValidator()],
        verbose_name="URL de la imagen"
    )
    event_country = models.CharField(max_length=100, verbose_name="País del evento")
    event_state = models.CharField(max_length=100, verbose_name="Estado/Provincia")
    event_city = models.CharField(max_length=100, verbose_name="Ciudad")
    event_date = models.DateField(verbose_name="Fecha del evento")
    description = models.TextField(
        blank=True, 
        null=True,
        verbose_name="Descripción"
    )
    photographer = models.CharField(
        max_length=100, 
        blank=True, 
        null=True,
        verbose_name="Fotógrafo"
    )
    is_featured = models.BooleanField(
        default=False,
        verbose_name="Imagen destacada"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Actualizado")
    
    class Meta:
        verbose_name = "Foto"
        verbose_name_plural = "Fotos"
        ordering = ['-event_date', '-created_at']
        unique_together = ['pic_url']
    
    def __str__(self):
        return f"Foto de {self.event_city}, {self.event_country} - {self.event_date}"
    
    def get_location(self):
        """Retorna la ubicación completa"""
        return f"{self.event_city}, {self.event_state}, {self.event_country}"