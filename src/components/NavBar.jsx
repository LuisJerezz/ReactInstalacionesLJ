import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getToken, clearToken } from '../services/auth';
import api from "../services/api";

function NavBar() {
  // Estado para controlar si el usuario está autenticado
  const [isLogged, setIsLogged] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const location = useLocation(); // Obtiene la ubicación actual
  const navigate = useNavigate(); // Ahora useNavigate tiene acceso al contexto del Router
  
  // Se ejecuta cada vez que cambia la ruta
  useEffect(() => {
    const token = getToken();
    // devuelve true si es un string y false si es undefined
    setIsLogged(!!token);
    if (isLogged) {
      const peticion = async () => {
        try {
            const response = await api.get('/usuario'); // Aquí hacemos la petición para obtener el tipo de usuario
            setTipoUsuario(response.data.tipo); // Suponiendo que la respuesta tiene un campo 'tipo'
        } catch (err) {
            navigate('/login'); // Redirige al login si no se puede obtener el tipo
            console.log(err);
        }
      };
      peticion();
    }
  }, [location]);

  const handleLogout = () => {
    clearToken();
    setIsLogged(false);
    setTipoUsuario(''); // Limpiar tipo de usuario
    navigate('/login');
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestión de reservas</Navbar.Brand>
        {/* Botón para mostrar/ocultar el menú en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Contenedor colapsable del menú */}
        <Navbar.Collapse id="basic-navbar-nav">        
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {tipoUsuario === 'ADMIN' && ( // Si es ADMIN, muestra la opción de Instalaciones
              <>
                <Nav.Link as={Link} to="/instalaciones">Instalaciones</Nav.Link>
                <Nav.Link as={Link} to="/usuario">Usuarios</Nav.Link> {/* Añadido para ir a la lista de usuarios */}
              </>
            )}
            {isLogged ? (
              <>                                 
                <Nav.Link as={Link} to="/mis-reservas">Mis reservas</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
