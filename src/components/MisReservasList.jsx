import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const MisReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const navigate = useNavigate();

    // Obtener las reservas al cargar el componente
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await api.get('/mis-reservas');
                setReservas(response.data);
            } catch (err) {
                console.log("Error al obtener reservas:", err);
            }
        };
        fetchReservas();
    }, []);

    // Función para redirigir a la página de eliminación
    const handleEliminarClick = (reserva) => {
        navigate(`/mis-reservas/del/${reserva.id}`, { state: { reserva } });
    };

    // Función para redirigir a la página de edición
    const handleEditarClick = (reserva) => {
        navigate(`/mis-reservas/edit/${reserva.id}`, { state: { reserva } });
    };

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Instalación</th>
                        <th>Hora reserva</th>
                        <th>Fecha reserva</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.horario.instalacion.nombre}</td>
                            <td>{reserva.horario.horaInicio}</td>
                            <td>{reserva.fecha}</td>
                            <td>
                                <Button
                                    onClick={() => handleEditarClick(reserva)}
                                    className="btn-success"
                                >
                                    Editar
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => handleEliminarClick(reserva)}
                                    className="btn-danger"
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MisReservasList;
