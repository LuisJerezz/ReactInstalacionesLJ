import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import UsuariosList from "../components/UsuariosList";

const UsuariosPage = () => {
    return (<>
        <h3>Listado de Usuarios</h3>
        <UsuariosList />
        <Button as={Link} to="/usuarios/add">
            Añadir un nuevo usuario
        </Button>
    </>);
}

export default UsuariosPage;