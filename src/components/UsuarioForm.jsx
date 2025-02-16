import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const UsuarioForm = () => {
    let { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [enabled, setEnabled] = useState(true);
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
            const response = await api.post('/admin/usuario', { username, email, enabled });
            console.log(response);
            navigate('/usuario');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const deleteForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.delete('/admin/usuario/' + id);
            console.log(response);
            navigate('/usuario');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const manejaAtras = async (event) => {
        event.preventDefault();
        navigate(-1);
    };

    useEffect(() => {
        const peticion = async () => {
            if (!isNaN(id)) {
                try {
                    const response = await api.get('/usuario/' + id);
                    setUsername(response.data.username);
                    setEmail(response.data.email);
                    setEnabled(response.data.enabled);
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
                    placeholder="ID de Usuario"
                    aria-label="Identificador del usuario"
                    disabled
                    value={id}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username de Usuario"
                    aria-label="Username del usuario"
                    value={username}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email del Usuario"
                    aria-label="Email del usuario"
                    value={email}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={manejaForm}>Actualizar</Button>,
                        'del': <Button as={Link} className="btn-danger" onClick={deleteForm}>Borrar</Button>
                    }[estado()]
                }
                <Button as={Link} onClick={manejaAtras}>
                    Cancelar
                </Button>
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </Form>
    );
};

export default UsuarioForm;
