from django.shortcuts import render, get_object_or_404

from rest_framework.generics import ListAPIView
from rest_framework import filters, status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import api_view
from allauth.account.models import EmailConfirmationHMAC
from allauth.account.utils import complete_signup

from .serializers import RegistrationSerializer
from .serializers import RoomSerializer, DirectorySerializer,DetailedRoomSerializer
from .models import Room

# Create your views here.

class RoomListAPIView(ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.all()
    
class DetailedRoomAPIView(APIView):

    def get(self, request, room_name, room_id):
        room = get_object_or_404(Room, name=room_name, room_id=room_id)
        serializer = DetailedRoomSerializer(room)
        return Response(serializer.data)

class RoomSearchView(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'owner__username']

class RoomDirectoryAPIView(APIView):
    def get(self, request, room_name, room_id):
        room = get_object_or_404(Room, name=room_name, room_id=room_id)
        root_directory = room.root_directory
        if root_directory is None:
            return Response({'message': 'No root directory found for this room.'}, status=status.HTTP_404_NOT_FOUND)
        root_serialized = DirectorySerializer(root_directory).data
        return Response({'root_directory': root_serialized}, status=status.HTTP_200_OK)
    



@api_view(['POST'])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save(request)
        email_confirmation = EmailConfirmationHMAC(user)
        email_confirmation.send()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
