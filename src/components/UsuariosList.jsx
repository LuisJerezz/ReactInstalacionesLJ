import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get('/admin/usuario');
                setUsuarios(response.data);
            } catch (err) {
                if (err.response?.status === 403) {
                    navigate('/login');
                } else {
                    setError('Error cargando usuarios');
                }
            }
        };
        fetchUsuarios();
    }, [navigate]);

    if (error) return <div className="alert alert-danger">{error}</div>
    
    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Tipo</th>
                        <th>Habilitado</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.tipo}</td>
                            <td>{usuario.enabled ? "Sí" : "No"}</td>
                            <td>
                                <Button as={Link} to={`/usuarios/edit/${usuario.id}`} className="btn-success">
                                    Editar
                                </Button>
                            </td>
                            <td>
                                <Button as={Link} to={`/usuarios/del/${usuario.id}`} className="btn-danger">
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

export default UsuariosList;