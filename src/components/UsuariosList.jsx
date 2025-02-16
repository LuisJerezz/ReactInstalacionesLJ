import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const UsuariosList = () => {
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
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
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
                            <td>
                                <Button as={Link} to={`/usuario/edit/${usuario.id}`} className="btn-success">
                                    Editar
                                </Button>
                            </td>
                            <td>
                                <Button as={Link} to={`/usuario/del/${usuario.id}`} className="btn-danger">
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
