from flask import Flask, render_template, request, jsonify
from EmotionDetection.emotion_detection import emotion_detector
import logging
import os

app = Flask(__name__)

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route("/")
def render_index_page():
    logger.debug("Accediendo a la página principal")
    return render_template("index.html")

@app.route("/emotionDetector", methods=["GET"])
def detect_emotion():
    logger.debug("Iniciando detección de emociones")
    
    text_to_analyze = request.args.get("textToAnalyze")
    logger.debug(f"Texto recibido: {text_to_analyze}")

    try:
        result = emotion_detector(text_to_analyze)
        logger.debug(f"Resultado del análisis: {result}")

        if result["dominant_emotion"] is None:
            logger.debug("No se pudo determinar la emoción dominante")
            return jsonify({
                "status": "error",
                "message": "¡Texto inválido! ¡Por favor, inténtalo de nuevo!",
                "debug_info": {
                    "input_text": text_to_analyze,
                    "result": result
                }
            }), 400

        response_data = {
            "status": "success",
            "message": (
                f"Para la declaración dada, la respuesta del sistema es "
                f"'anger': {result['anger']}, 'disgust': {result['disgust']}, "
                f"'fear': {result['fear']}, 'joy': {result['joy']}, "
                f"'sadness': {result['sadness']}. "
                f"La emoción dominante es {result['dominant_emotion']}."
            ),
            "data": result
        }
        logger.debug(f"Respuesta final: {response_data}")
        return jsonify(response_data)

    except Exception as e:
        logger.error(f"Error en detect_emotion: {str(e)}", exc_info=True)
        return jsonify({
            "status": "error",
            "message": "Error interno del servidor",
            "error_details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)