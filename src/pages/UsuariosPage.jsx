import { Button } from "react-bootstrap";
import UsuariosList from "../components/UsuariosList";
import { Link } from "react-router-dom";

const UsuariosPage = () => {
    return (
        <>
            <h3>Listado de usuarios</h3>
            <UsuariosList />
            <Button as={Link} to="/usuario/add">
                Añadir un nuevo usuario
            </Button>
        </>
    );
};

export default UsuariosPage;
