import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const RoomListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://172.18.0.2:8000/api/rooms/");
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    let response = null;

    try {
      if (!searchTerm) {
        response = await fetch("http://172.18.0.2:8000/api/rooms/");
      } else {
        const formattedSearchTerm = searchTerm.replace("#", " ");
        response = await fetch(
          `http://172.18.0.2:8000/api/rooms/search/?search=${formattedSearchTerm}&ordering=name`
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
    <Container className="mt-5" style={{ paddingTop: "20px" }}>
      <Row>
        <Col>
          <div className="d-flex align-items-center mb-3">
            <h1 className="me-3">Buscar Salas</h1>
            <Button as={Link} to="/salas/crear" variant="primary">
              Crear Sala
            </Button>
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs={12} md={8} lg={9}>
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
                  href={`/sala/${room.name + "/" + room.room_id}`}
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
