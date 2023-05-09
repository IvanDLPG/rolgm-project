from channels.db import database_sync_to_async
from .models import Room, Message, Character, Player


@database_sync_to_async
def create_mensaje(room_id, data):
    # obtener el chat de la habitación
    chat = Room.objects.get(id=room_id).chat.get()
    
    # crear el mensaje en el chat
    mensaje = Message(
        chat=chat,
        user_id=data['user_id'],
        message=data['message'],
        written_as=data['written_as']
    )
    mensaje.save()
    
    return mensaje

@database_sync_to_async
def get_character(data):
    player = Player.objects.get(id=data['player'])
    
    # buscar el personaje
    try:
        character = Character.objects.get(player=player, name=data['name'])
    except Character.DoesNotExist:
        character = None
    
    return character
