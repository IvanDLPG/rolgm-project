import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "./canvas";
import { Settings, SideRoomMenu } from "./sidemenu";
import { RoomContext, UserContext } from "../../contexts";
import { Chat } from "./chat";
import { CharacterMenu } from "./character";

const fetchRoomData = async (roomId, setActiveRoom) => {
  const response = await fetch(`http://172.18.0.2:8000/api/room/${roomId}`);
  const data = await response.json();
  setActiveRoom(data);
};

const Room = () => {
  const { setActiveRoom } = useContext(RoomContext);
  const { darkMode } = useContext(UserContext);
  const { roomId } = useParams();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleMenuButtonClick = () => setIsSideMenuOpen(!isSideMenuOpen);

  useEffect(() => {
    console.log("ROOM",darkMode)
  
  }, [darkMode])

  const tabs = [
    { name: "Chat", icon: "/media/chat-icon.svg", content: <Chat /> },
    { name: "Character", icon: "/media/character-icon.png", content: <CharacterMenu /> },
    { name: "Diary", icon: "/media/diary.svg", content: <Chat /> },
    { name: "Music", icon: "/media/music.svg", content: <Chat /> },
    { name: "Setting", icon: "/media/settings.svg", content: <Settings /> },
  ];

  useEffect(() => {
    fetchRoomData(roomId, setActiveRoom);
  }, []);

  const memoizedSideMenu = useMemo(() => <SideRoomMenu tabs={tabs} />, []);

  return (
    <div className={`room-wrapper ${isSideMenuOpen ? "room-menu-open" : ""}`}>
      <div className="room-canvas">
        <button className="room-menu-btn" onClick={handleMenuButtonClick}>
          {isSideMenuOpen ? ">" : "<"}
        </button>
        <Canvas />
        <div className={`room-menu 
           ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}
            `}>{memoizedSideMenu}</div>
      </div>
    </div>
  );
};

export default Room;