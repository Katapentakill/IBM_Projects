from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Song(models.Model):
    """Modelo para almacenar información de canciones"""
    
    title = models.CharField(max_length=200, verbose_name="Título")
    artist = models.CharField(max_length=100, verbose_name="Artista")
    album = models.CharField(max_length=200, verbose_name="Álbum")
    lyrics = models.TextField(verbose_name="Letra")
    genre = models.CharField(max_length=50, default="Unknown", verbose_name="Género")
    year = models.IntegerField(
        null=True, 
        blank=True,
        validators=[
            MinValueValidator(1900),
            MaxValueValidator(2030)
        ],
        verbose_name="Año"
    )
    duration = models.CharField(
        max_length=10, 
        default="Unknown",
        help_text="Formato: MM:SS",
        verbose_name="Duración"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Creado")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Actualizado")
    
    class Meta:
        verbose_name = "Canción"
        verbose_name_plural = "Canciones"
        ordering = ['title']
        unique_together = ['title', 'artist']
    
    def __str__(self):
        return f"{self.title} - {self.artist}"
    
    def get_short_lyrics(self):
        """Retorna una versión corta de la letra"""
        if len(self.lyrics) > 100:
            return self.lyrics[:100] + "..."
        return self.lyrics