import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const peticion = async () => {
            try {
                const response = await api.get('/admin/usuario');
                setUsuarios(response.data);
            } catch (err) {
                navigate('/login');
                console.log(err);
            }
        };
        peticion();
    }, []);

    return (
        <Container>
            <Table className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.username}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <Button as={Link} to={`/admin/usuario/edit/${usuario.id}`} className="btn-success">Editar</Button>
                            </td>
                            <td>
                                <Button as={Link} to={`/admin/usuario/del/${usuario.id}`} className="btn-danger">Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UsuarioList;