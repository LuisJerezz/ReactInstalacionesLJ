import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const UsuarioForm = () => {
    let { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [enable, setEnable] = useState(false);
    const [rol, setRol] = useState("ADMIN");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const ruta = useLocation();

    const estado = () => {
        if (ruta.pathname.includes("add")) return "add";
        if (ruta.pathname.includes("edit")) return "edit";
        if (ruta.pathname.includes("del")) return "del";
    };

    const manejaAtras = async(event) => {
        event.preventDefault();
        navigate(-1);
    }

    const manejarUsuario = async (event) => {
        event.preventDefault();

        const usuarioData = { enable, nombre, email, rol };
        if (estado() === "add") {
            usuarioData.password = password;
        }

        try {
            if (estado() === "add") {
                await api.post("/admin/usuario", usuarioData);
            } else {
                await api.put(`/admin/usuario/${id}`, usuarioData);
            }
            navigate("/admin/usuario");
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                setError("No se puede completar la operación");
            }
        }
    };

    useEffect(() => {
        const peticion = async () => {
            if (id && !isNaN(id)) {
                try {
                    const response = await api.get(`/admin/usuario/${id}`);
                    setNombre(response.data.nombre || "");  
                    setEmail(response.data.email || "");  
                    setEnable(!!response.data.enable);
                    setRol(response.data.rol || "ADMIN");  
                } catch (error) {
                    if (error.response?.status === 401) {
                        navigate('/login');
                    } else {
                        console.error("No se puede completar la operación", error);
                    }
                }
            }
        };
        if (estado() !== "add") {
            peticion();
        }
    }, [id, navigate]);  

    return (
        <Form onSubmit={manejarUsuario}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nombre del usuario"
                    value={nombre || ""}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>
            {estado() === "add" && (
                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password del usuario"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
            )}
            <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Email del usuario"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Rol:</Form.Label>
                <Form.Control
                    as="select"
                    value={rol || "ADMIN"}
                    onChange={(e) => setRol(e.target.value)}
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="OPERARIO">OPERARIO</option>
                    <option value="USUARIO">USUARIO</option>
                </Form.Control>
            </Form.Group>
            <Button type="submit" className="btn-success">
                {estado() === "add" ? "Alta" : "Actualizar"}
            </Button>
            <Button as={Link} onClick={manejaAtras} >
                    Cancelar
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </Form>
    );
};

export default UsuarioForm;