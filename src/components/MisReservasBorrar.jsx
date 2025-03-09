import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const MisReservasBorrar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const reserva = location.state?.reserva; // Obtener la reserva desde el estado de la navegación
    const [error, setError] = useState('');

    // Si no hay reserva, mostrar un mensaje y redirigir
    if (!reserva) {
        return (
            <Container>
                <p>No se ha seleccionado ninguna reserva para eliminar.</p>
                <Button onClick={() => navigate('/mis-reservas')}>Volver a Mis Reservas</Button>
            </Container>
        );
    }

    const handleDelete = async () => {
        try {
            await api.delete(`/mis-reservas/${reserva.id}`);
            navigate('/mis-reservas'); // Redirigir a la lista de reservas después de eliminar
        } catch (err) {
            setError('No se puede completar la operación');
            console.log("Error al eliminar reserva:", err);
        }
    };

    const handleCancel = () => {
        navigate('/mis-reservas'); // Volver a la lista de reservas sin eliminar
    };

    return (
        <Container>
            <h2>Eliminar una eserva</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>ID:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ID de Reserva"
                        aria-label="Identificador de la reserva"
                        disabled
                        value={reserva.id}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Instalación:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Instalación"
                        aria-label="Instalación reservada"
                        disabled
                        value={reserva.horario.instalacion.nombre}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Hora:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Hora de la reserva"
                        aria-label="Hora de la reserva"
                        disabled
                        value={reserva.horario.horaInicio}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Fecha de la reserva"
                        aria-label="Fecha de la reserva"
                        disabled
                        value={reserva.fecha}
                    />
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Form.Group className="mb-3">
                    <Button className="btn-danger" onClick={handleDelete}>Confirmar eliminación</Button>
                    <Button onClick={handleCancel} className="ms-2">Cancelar</Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default MisReservasBorrar;
