import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const MisReservaForm = () => {
    let { id } = useParams();

    const [usuario, setUsuario] = useState('');
    const [instalacion, setInstalacion] = useState('');
    const [horario, setHorario] = useState('');
    const [fecha, setFecha] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    }

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/mis-reservas', { usuario, instalacion, horario, fecha });
            console.log(response);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete(`/mis-reservas/${id}`);
            console.log(response);
            navigate('/mis-reservas');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    }

    const manejaAtras = (event) => {
        event.preventDefault();
        navigate(-1);
    }

    useEffect(() => {
        const peticion = async () => {
            if (!isNaN(id)) {
                try {
                    const response = await api.get(`/mis-reservas/${id}`);
                    setUsuario(response.data.usuario);
                    setInstalacion(response.data.horario.instalacion.nombre);
                    setHorario(response.data.horario.horaInicio);
                    setFecha(response.data.fecha);
                } catch (err) {
                    setError('No se puede completar la operación');
                    console.log(err);
                }
            }
        };
        peticion();
    }, [id]);

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ID de Reserva"
                    aria-label="Identificador de la reserva"
                    disabled
                    value={id}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre de Usuario"
                    aria-label="Nombre del usuario"
                    value={usuario}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Instalación:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Instalación"
                    aria-label="Instalación reservada"
                    value={instalacion}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setInstalacion(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Hora:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Hora de la reserva"
                    aria-label="Hora de la reserva"
                    value={horario}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setHorario(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Fecha de la reserva"
                    aria-label="Fecha de la reserva"
                    value={fecha}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setFecha(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Crear Reserva</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar Reserva</Button>,
                        'del': <Button as={Link} className="btn-danger" onClick={deleteForm}>Eliminar Reserva</Button>
                    }[estado()]
                }
                <Button as={Link} onClick={manejaAtras}>
                    Cancelar
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
}

export default MisReservaForm;
