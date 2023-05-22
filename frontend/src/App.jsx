import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HomePage, RoomListPage } from "./pages";
import { MainNavbar, Room } from "./components";
import { UserContext } from "./contexts";
import "./styles/rooms.css";
import "./styles/home.css";
import "./styles/nav.css";

export const App = () => {
  const location = useLocation();
  const shouldRenderNavbar = !location.pathname.includes("/sala/");
  const { user } = useContext(UserContext);
  return (
    <>
      {shouldRenderNavbar && <MainNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        {user ? (
          <>
            <Route path="/salas" element={<RoomListPage />} />
            <Route path="/sala/:roomId" element={<Room />} />
          </>
        ) : (
          ""
        )}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

