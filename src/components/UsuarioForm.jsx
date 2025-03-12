import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api"; 

const UsuarioForm = () => {
    let { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipo, setTipo] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes('add')) return 'add';
        if (ruta.pathname.includes('del')) return 'del';
        if (ruta.pathname.includes('edit')) return 'edit';
    };

    const manejaForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/admin/usuario', { username, email, password, tipo, enabled });
            console.log(response);
            navigate('/usuarios');
        } catch (err) {
            setError('No se puede completar la petición');
            console.log(err);
        }
    };

    const updateForm = async (event) => {
        event.preventDefault();
        try {
            const response = await api.put('/admin/usuario/' + id, { username, email, password, tipo, enabled });
            console.log(response);
            navigate('/usuarios');
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
            navigate('/usuarios');
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
                    const response = await api.get('/admin/usuario/' + id);
                    setUsername(response.data.username)
                    setEmail(response.data.email);
                    setTipo(response.data.tipo);
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
                    aria-label="Identificador de Usuario"
                    disabled
                    value={id}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Username de Usuario"
                    aria-label="Username de Usuario"
                    value={username}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email de Usuario"
                    aria-label="Email de Usuario"
                    value={email}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    value={password}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Tipo:</Form.Label>
                <Form.Select
                    value={tipo}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="OPERARIO">OPERARIO</option>
                    <option value="USUARIO">USUARIO</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Habilitado"
                    checked={enabled}
                    disabled={estado() === 'del' ? true : false}
                    onChange={(e) => setEnabled(e.target.checked)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                {
                    {
                        'add': <Button className="btn-success" onClick={manejaForm}>Alta</Button>,
                        'edit': <Button className="btn-success" onClick={updateForm}>Actualizar</Button>,
                        'del': <Button className="btn-danger" onClick={deleteForm}>Borrar</Button>
                    } [estado()]
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