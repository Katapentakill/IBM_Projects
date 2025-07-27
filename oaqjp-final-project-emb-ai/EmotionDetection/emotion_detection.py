from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, EmotionOptions
import logging
import os

# Configura logging para ver los detalles
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Configuración de IBM Watson NLU (usa variables de entorno para seguridad)
API_KEY = os.getenv('IBM_NLU_API_KEY', 'tu_api_key_aquí')  # Reemplaza con tu API key real
SERVICE_URL = os.getenv('IBM_NLU_URL', 'tu_url_aquí')      # Ej: https://api.us-south.natural-language-understanding.watson.cloud.ibm.com

# Configura el cliente de Watson NLU
authenticator = IAMAuthenticator(API_KEY)
nlu_client = NaturalLanguageUnderstandingV1(
    version='2022-04-07',  # Usa la versión más reciente
    authenticator=authenticator
)
nlu_client.set_service_url(SERVICE_URL)

def emotion_detector(text_to_analyze):
    """Analiza las emociones en el texto usando IBM Watson NLU"""
    logger.debug(f"Iniciando emotion_detector con texto: {text_to_analyze}")
    
    if not text_to_analyze.strip():
        logger.debug("Texto vacío detectado")
        return {
            'anger': None, 'disgust': None, 'fear': None,
            'joy': None, 'sadness': None, 'dominant_emotion': None
        }

    try:
        logger.debug("Enviando solicitud a Watson NLU...")
        
        # Versión CORREGIDA - sin parámetro language o con language='en'
        response = nlu_client.analyze(
            text=text_to_analyze,
            features=Features(emotion=EmotionOptions())
            # language='es'  # <<< ESTO CAUSABA EL ERROR 400
        ).get_result()
        
        logger.debug(f"Respuesta completa de Watson NLU: {response}")
        
        # Extrae las emociones del documento completo
        emotions = response['emotion']['document']['emotion']
        dominant = max(emotions.items(), key=lambda x: x[1])[0]
        
        logger.debug(f"Emociones detectadas: {emotions}")
        logger.debug(f"Emoción dominante: {dominant}")

        return {
            'anger': emotions['anger'],
            'disgust': emotions['disgust'],
            'fear': emotions['fear'],
            'joy': emotions['joy'],
            'sadness': emotions['sadness'],
            'dominant_emotion': dominant
        }

    except Exception as e:
        logger.error(f"Error al analizar emociones: {str(e)}", exc_info=True)
        return {
            'anger': None, 'disgust': None, 'fear': None,
            'joy': None, 'sadness': None, 'dominant_emotion': None
        }