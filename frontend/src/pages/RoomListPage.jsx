import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../contexts";

const backend_url = import.meta.env.VITE_API_URL;

export const RoomListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [url, setUrl] = useState(window.location.pathname === "/mis-partidas" ? `${backend_url}/api/own-rooms/` : `${backend_url}/api/rooms/`);
  const { darkMode } = useContext(UserContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {

        const response = await fetch(url,
          { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
        )
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error(error.error);
      }
    };
    fetchRooms();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    let response = null;

    try {
      if (!searchTerm) {
        response = await fetch(url);
      } else {
        const formattedSearchTerm = searchTerm.replace("#", " ");
        response = await fetch(
          `${backend_url}/api/rooms/search/?search=${formattedSearchTerm}&ordering=name`,
          { headers: { Authorization: `Token ${localStorage.getItem('token')}` } }
        );
      }

      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container fluid className={darkMode ? "bg-custom-dark" : "bg-custom-light"} style={{ height: "100vh", padding: "0 30px" }}>
      <Row style={{ paddingTop: "80px" }}>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1 className="me-3">Buscar Salas</h1>
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs={12} md={8} lg={9} className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ingrese su búsqueda aquí"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Col>
          <Col xs={12} md={4} lg={3}>
            <Button variant="primary" type="submit">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
      <Row>
        {rooms.map((room) => (
          <Col xs={12} md={6} lg={4} key={room.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{room.name + "#" + room.room_id}</h5>
                <p className="card-text">{room.created_at}</p>
                <p className="card-text">
                  Jugadores: {room.player_count} | Espectadores:{" "}
                  {room.spectator_count}{" "}
                </p>
                <a
                  href={`/sala/${room.id}/detail`}
                  className="btn btn-primary"
                >
                  Ver Sala
                </a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoomListPage;
