import pytest
import json
import sys
import os

# Agregar el directorio padre al path para poder importar app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app, pictures_data

@pytest.fixture
def client():
    """Fixture para crear un cliente de prueba"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health(client):
    """Test para verificar el endpoint de salud del servicio"""
    response = client.get('/health')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert data['status'] == 'OK'
    assert data['service'] == 'Pictures Service'
    assert 'timestamp' in data

def test_count(client):
    """Test para verificar el conteo de imágenes"""
    response = client.get('/count')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'count' in data
    assert data['count'] == len(pictures_data)

def test_data_contains_10_pictures(client):
    """Test para verificar que devuelve 10 imágenes"""
    response = client.get('/pictures')
    assert response.status_code == 200
    
    data = json.loads(response.data)
    assert 'pictures' in data
    assert len(data['pictures']) == 10
    assert data['total'] == 10

def test_get_picture(client):
    """Test para obtener una imagen específica por ID"""
    # Primero obtenemos todas las imágenes para tener un ID válido
    response = client.get('/pictures')
    data = json.loads(response.data)
    picture_id = data['pictures'][0]['id']
    
    # Ahora probamos obtener esa imagen específica
    response = client.get(f'/pictures/{picture_id}')
    assert response.status_code == 200
    
    picture_data = json.loads(response.data)
    assert picture_data['id'] == picture_id
    assert 'pic_url' in picture_data
    assert 'event_country' in picture_data

def test_get_pictures_check_content_type_equals_json(client):
    """Test para verificar que el tipo de contenido es JSON"""
    response = client.get('/pictures')
    assert response.status_code == 200
    assert response.content_type == 'application/json'

def test_post_picture(client):
    """Test para agregar una nueva imagen"""
    new_picture = {
        "pic_url": "http://dummyimage.com/230x100.png/dddddd/000000",
        "event_country": "United States",
        "event_state": "California",
        "event_city": "Fremont",
        "event_date": "11/2/2030"
    }
    
    response = client.post('/pictures', 
                          data=json.dumps(new_picture),
                          content_type='application/json')
    assert response.status_code == 201
    
    data = json.loads(response.data)
    assert data['message'] == 'Picture created successfully'
    assert 'picture' in data
    assert data['picture']['pic_url'] == new_picture['pic_url']

def test_post_picture_duplicate(client):
    """Test para verificar que no se pueden agregar imágenes duplicadas"""
    # Primero obtenemos una URL existente
    response = client.get('/pictures')
    existing_data = json.loads(response.data)
    existing_url = existing_data['pictures'][0]['pic_url']
    
    duplicate_picture = {
        "pic_url": existing_url,  # URL que ya existe
        "event_country": "Test Country",
        "event_state": "Test State",
        "event_city": "Test City",
        "event_date": "2024-01-01"
    }
    
    response = client.post('/pictures',
                          data=json.dumps(duplicate_picture),
                          content_type='application/json')
    assert response.status_code == 409

def test_update_picture_by_id(client):
    """Test para actualizar una imagen existente"""
    # Obtenemos un ID existente
    response = client.get('/pictures')
    data = json.loads(response.data)
    picture_id = data['pictures'][0]['id']
    
    update_data = {
        "event_country": "Updated Country",
        "event_city": "Updated City"
    }
    
    response = client.put(f'/pictures/{picture_id}',
                         data=json.dumps(update_data),
                         content_type='application/json')
    assert response.status_code == 200

def test_delete_picture_by_id(client):
    """Test para eliminar una imagen"""
    # Primero agregamos una imagen para eliminar
    new_picture = {
        "pic_url": "https://test.example.com/to-delete.jpg",
        "event_country": "Test Country",
        "event_state": "Test State",
        "event_city": "Test City",
        "event_date": "2024-01-01"
    }
    
    post_response = client.post('/pictures',
                               data=json.dumps(new_picture),
                               content_type='application/json')
    post_data = json.loads(post_response.data)
    picture_id = post_data['picture']['id']
    
    # Ahora eliminamos la imagen
    response = client.delete(f'/pictures/{picture_id}')
    assert response.status_code == 200