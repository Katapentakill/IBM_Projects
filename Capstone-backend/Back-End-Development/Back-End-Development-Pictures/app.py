from flask import Flask, jsonify, request
from datetime import datetime
import uuid

app = Flask(__name__)

# Datos simulados para las imágenes
pictures_data = [
    {
        "id": str(uuid.uuid4()),
        "pic_url": f"https://picsum.photos/200/300?random={i}",
        "event_country": ["USA", "Spain", "Japan", "Brazil", "France"][i % 5],
        "event_state": ["California", "Madrid", "Tokyo", "São Paulo", "Paris"][i % 5],
        "event_city": ["Los Angeles", "Madrid", "Tokyo", "São Paulo", "Paris"][i % 5],
        "event_date": f"2024-0{(i % 9) + 1}-{10 + i}",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    for i in range(10)
]

@app.route('/health', methods=['GET'])
def health():
    """Endpoint para verificar el estado del servicio"""
    return jsonify({
        "status": "OK",
        "service": "Pictures Service",
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/count', methods=['GET'])
def count():
    """Endpoint para obtener el número total de imágenes"""
    return jsonify({
        "count": len(pictures_data)
    }), 200

@app.route('/pictures', methods=['GET'])
def get_pictures():
    """Endpoint para obtener todas las imágenes"""
    return jsonify({
        "pictures": pictures_data,
        "total": len(pictures_data)
    }), 200

@app.route('/pictures/<picture_id>', methods=['GET'])
def get_picture(picture_id):
    """Endpoint para obtener una imagen específica por ID"""
    picture = next((pic for pic in pictures_data if pic["id"] == picture_id), None)
    
    if picture:
        return jsonify(picture), 200
    else:
        return jsonify({
            "error": "Picture not found",
            "message": f"Picture with id {picture_id} does not exist"
        }), 404

@app.route('/pictures', methods=['POST'])
def post_picture():
    """Endpoint para agregar una nueva imagen"""
    data = request.get_json()
    
    # Validar datos requeridos
    required_fields = ['pic_url', 'event_country', 'event_state', 'event_city', 'event_date']
    if not data or not all(field in data for field in required_fields):
        return jsonify({
            "error": "Missing required fields",
            "required": required_fields
        }), 400
    
    # Verificar si la imagen ya existe (por URL)
    existing_picture = next((pic for pic in pictures_data if pic["pic_url"] == data["pic_url"]), None)
    if existing_picture:
        return jsonify({
            "error": "Picture already exists",
            "message": "A picture with this URL already exists",
            "existing_id": existing_picture["id"]
        }), 409
    
    # Crear nueva imagen
    new_picture = {
        "id": str(uuid.uuid4()),
        "pic_url": data["pic_url"],
        "event_country": data["event_country"],
        "event_state": data["event_state"],
        "event_city": data["event_city"],
        "event_date": data["event_date"],
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    
    pictures_data.append(new_picture)
    
    return jsonify({
        "message": "Picture created successfully",
        "picture": new_picture
    }), 201

@app.route('/pictures/<picture_id>', methods=['PUT'])
def update_picture(picture_id):
    """Endpoint para actualizar una imagen existente"""
    data = request.get_json()
    
    if not data:
        return jsonify({
            "error": "No data provided"
        }), 400
    
    picture_index = next((i for i, pic in enumerate(pictures_data) if pic["id"] == picture_id), None)
    
    if picture_index is None:
        return jsonify({
            "error": "Picture not found",
            "message": f"Picture with id {picture_id} does not exist"
        }), 404
    
    # Actualizar campos proporcionados
    updatable_fields = ['pic_url', 'event_country', 'event_state', 'event_city', 'event_date']
    for field in updatable_fields:
        if field in data:
            pictures_data[picture_index][field] = data[field]
    
    pictures_data[picture_index]["updated_at"] = datetime.now().isoformat()
    
    return jsonify({
        "message": "Picture updated successfully",
        "picture": pictures_data[picture_index]
    }), 200

@app.route('/pictures/<picture_id>', methods=['DELETE'])
def delete_picture(picture_id):
    """Endpoint para eliminar una imagen"""
    picture_index = next((i for i, pic in enumerate(pictures_data) if pic["id"] == picture_id), None)
    
    if picture_index is None:
        return jsonify({
            "error": "Picture not found",
            "message": f"Picture with id {picture_id} does not exist"
        }), 404
    
    deleted_picture = pictures_data.pop(picture_index)
    
    return jsonify({
        "message": "Picture deleted successfully",
        "deleted_picture": deleted_picture
    }), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not Found",
        "message": "The requested resource was not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal Server Error",
        "message": "Something went wrong on our end"
    }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)