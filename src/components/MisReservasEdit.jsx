import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import api from '../services/api';

const MisReservasEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reserva = location.state?.reserva;
    const [error, setError] = useState('');
    const [instalaciones, setInstalaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        fecha: '',
        hora: '',
        instalacion: '',
    });

    useEffect(() => {
        const fetchInstalaciones = async () => {
            try {
                const response = await api.get('/instalacion');
                setInstalaciones(response.data);
            } catch (err) {
                console.log("Error al obtener instalaciones:", err);
            }
        };
        fetchInstalaciones();
    }, []);

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!formData.instalacion || !formData.fecha) return;

            try {
                const response = await api.get(`/mis-reservas/horario/instalacion/${formData.instalacion}/fecha/${formData.fecha}`);
                setHorarios(response.data);
            } catch (err) {
                console.log("Error al obtener horarios:", err);
            }
        };
        fetchHorarios();
    }, [formData.instalacion, formData.fecha]);

    useEffect(() => {
        if (reserva) {
            setFormData({
                id: reserva.id,
                fecha: reserva.fecha,
                hora: reserva.horario.horaInicio,
                instalacion: reserva.horario.instalacion.id,
            });
        } else {
            // Redirigir en caso de que no haya reserva
            navigate('/mis-reservas');
        }
    }, [reserva, navigate]);

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Obtener el horario seleccionado con base en la hora seleccionada
        const horarioSeleccionado = horarios.find(horario => horario.horaInicio === formData.hora);

        // Validaciones: Asegurarse de que la instalación y la hora sean válidas
        if (!formData.instalacion || !formData.hora || !formData.fecha) {
            setError('Debe seleccionar una instalación, fecha y hora válidas');
            setLoading(false);
            return;
        }

        const reservaActualizada = {
            id: formData.id, // Incluye el id de la reserva para la actualización
            usuario: { id: reserva.usuario.id }, // Mantiene el usuario actual
            horario: horarioSeleccionado, // Usamos el horario seleccionado
            fecha: formData.fecha, // Actualizamos la fecha seleccionada
        };

        try {
            // Realiza la petición PUT para actualizar la reserva
            await api.put(`/mis-reservas/${formData.id}`, reservaActualizada);
            setLoading(false);
            navigate('/mis-reservas'); // Redirigir a la lista de reservas después de guardar
        } catch (err) {
            setLoading(false);
            setError('Error al actualizar la reserva. Intenta de nuevo.');
            console.error("Error al actualizar la reserva:", err);
        }
    };


    const handleCancel = () => {
        navigate('/mis-reservas'); // Volver sin guardar cambios
    };

    return (
        <Container>
            <h2>Editar Reserva</h2>
            <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                    <Form.Label>ID:</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.id}
                        disabled
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="instalacionSeleccionada">
                    <Form.Label>Instalación</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.instalacion}
                        onChange={(e) => setFormData({ ...formData, instalacion: e.target.value })}
                        required
                    >
                        <option value="">Selecciona una instalación</option>
                        {instalaciones.map((instalacion) => (
                            <option key={instalacion.id} value={instalacion.id}>
                                {instalacion.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fecha">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="horaInicio">
                    <Form.Label>Hora de inicio</Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.hora}
                        onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                        required
                    >
                        <option value="">Selecciona una hora</option>
                        {horarios.map((horario) => (
                            <option key={horario.id} value={horario.horaInicio}>
                                {horario.horaInicio}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Form.Group className="mb-3">
                    {/* Mostrar el botón o el spinner según el estado de loading */}
                    {loading ? (
                        <Button variant="secondary" disabled>
                            <Spinner animation="border" size="sm" />
                            Cargando...
                        </Button>
                    ) : (
                        <Button type="submit" className="btn-success">Guardar Cambios</Button>
                    )}
                    <Button onClick={handleCancel} className="ms-2">Cancelar</Button>
                </Form.Group>
            </Form>

        </Container>
    );
};

export default MisReservasEdit;
