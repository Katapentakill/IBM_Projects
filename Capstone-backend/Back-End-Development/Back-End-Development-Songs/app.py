from flask import Flask, jsonify, request
from datetime import datetime
import uuid

app = Flask(__name__)

# Datos simulados para las canciones
songs_data = [
    {
        "id": str(uuid.uuid4()),
        "lyrics": "Yesterday, all my troubles seemed so far away...",
        "title": "Yesterday",
        "artist": "The Beatles",
        "album": "Help!",
        "genre": "Pop Rock",
        "year": 1965,
        "duration": "2:05",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "lyrics": "Is this the real life? Is this just fantasy?...",
        "title": "Bohemian Rhapsody",
        "artist": "Queen",
        "album": "A Night at the Opera",
        "genre": "Progressive Rock",
        "year": 1975,
        "duration": "5:55",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "lyrics": "Hello darkness, my old friend...",
        "title": "The Sound of Silence",
        "artist": "Simon & Garfunkel",
        "album": "Sounds of Silence",
        "genre": "Folk Rock",
        "year": 1964,
        "duration": "3:05",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "lyrics": "There is a house in New Orleans...",
        "title": "House of the Rising Sun",
        "artist": "The Animals",
        "album": "The Animals",
        "genre": "Folk Rock",
        "year": 1964,
        "duration": "4:29",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "lyrics": "We are the champions, my friends...",
        "title": "We Are the Champions",
        "artist": "Queen",
        "album": "News of the World",
        "genre": "Arena Rock",
        "year": 1977,
        "duration": "2:59",
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
]

@app.route('/health', methods=['GET'])
def health():
    """Endpoint para verificar el estado del servicio"""
    return jsonify({
        "status": "OK",
        "service": "Songs Service",
        "timestamp": datetime.now().isoformat(),
        "total_songs": len(songs_data)
    }), 200

@app.route('/songs', methods=['GET'])
def get_songs():
    """Endpoint para obtener todas las canciones"""
    return jsonify({
        "songs": songs_data,
        "total": len(songs_data)
    }), 200

@app.route('/songs/<song_id>', methods=['GET'])
def get_song(song_id):
    """Endpoint para obtener una canción específica por ID"""
    song = next((s for s in songs_data if s["id"] == song_id), None)
    
    if song:
        return jsonify(song), 200
    else:
        return jsonify({
            "error": "Song not found",
            "message": f"Song with id {song_id} does not exist"
        }), 404

@app.route('/songs', methods=['POST'])
def post_song():
    """Endpoint para agregar una nueva canción"""
    data = request.get_json()
    
    # Validar datos requeridos
    required_fields = ['title', 'artist', 'album', 'lyrics']
    if not data or not all(field in data for field in required_fields):
        return jsonify({
            "error": "Missing required fields",
            "required": required_fields
        }), 400
    
    # Verificar si la canción ya existe (por título y artista)
    existing_song = next((s for s in songs_data 
                         if s["title"].lower() == data["title"].lower() 
                         and s["artist"].lower() == data["artist"].lower()), None)
    if existing_song:
        return jsonify({
            "error": "Song already exists",
            "message": "A song with this title and artist already exists",
            "existing_id": existing_song["id"]
        }), 409
    
    # Crear nueva canción
    new_song = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "artist": data["artist"],
        "album": data["album"],
        "lyrics": data["lyrics"],
        "genre": data.get("genre", "Unknown"),
        "year": data.get("year", None),
        "duration": data.get("duration", "Unknown"),
        "created_at": datetime.now().isoformat(),
        "updated_at": datetime.now().isoformat()
    }
    
    songs_data.append(new_song)
    
    return jsonify({
        "message": "Song created successfully",
        "song": new_song
    }), 201

@app.route('/songs/<song_id>', methods=['PUT'])
def update_song(song_id):
    """Endpoint para actualizar una canción existente"""
    data = request.get_json()
    
    if not data:
        return jsonify({
            "error": "No data provided"
        }), 400
    
    song_index = next((i for i, s in enumerate(songs_data) if s["id"] == song_id), None)
    
    if song_index is None:
        return jsonify({
            "error": "Song not found",
            "message": f"Song with id {song_id} does not exist"
        }), 404
    
    # Actualizar campos proporcionados
    updatable_fields = ['title', 'artist', 'album', 'lyrics', 'genre', 'year', 'duration']
    for field in updatable_fields:
        if field in data:
            songs_data[song_index][field] = data[field]
    
    songs_data[song_index]["updated_at"] = datetime.now().isoformat()
    
    return jsonify({
        "message": "Song updated successfully",
        "song": songs_data[song_index]
    }), 200

@app.route('/songs/<song_id>', methods=['DELETE'])
def delete_song(song_id):
    """Endpoint para eliminar una canción"""
    song_index = next((i for i, s in enumerate(songs_data) if s["id"] == song_id), None)
    
    if song_index is None:
        return jsonify({
            "error": "Song not found",
            "message": f"Song with id {song_id} does not exist"
        }), 404
    
    deleted_song = songs_data.pop(song_index)
    
    return jsonify({
        "message": "Song deleted successfully",
        "deleted_song": deleted_song
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
    app.run(debug=True, host='0.0.0.0', port=5001)