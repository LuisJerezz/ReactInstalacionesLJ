import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";
import ReservaFormPage from "./pages/ReservaFormPage"; 
import ReservaDeletePage from "./pages/ReservaDeletePage"; 

// Agregadas las páginas de usuario
import UsuariosPage from "./pages/UsuariosPage"; // Página de listado de usuarios
import UsuarioFormPage from "./pages/UsuarioFormPage"; // Página para añadir/editar un usuario
import UsuarioDeletePage from "./pages/UsuarioDeletePage"; // Página para eliminar un usuario

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Ruta principal ("/")
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "instalaciones",
        element: <InstalacionesPage />,
      },
      {
        path: "instalacion/add",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/edit/:id",
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/del/:id",
        element: <InstalacionDeletePage />,
      },
      {
        path: "mis-reservas",
        element: <ReservasPage />,
      },
      {
        path: "mis-reservas/add",
        element: <ReservaFormPage />, // Añadir reserva
      },
      {
        path: "mis-reservas/edit/:id",
        element: <ReservaFormPage />, // Editar reserva
      },
      {
        path: "mis-reservas/del/:id",
        element: <ReservaDeletePage />, // Eliminar reserva
      },
      
      // Rutas para los usuarios
      {
        path: "usuario",
        element: <UsuariosPage />, // Listado de usuarios
      },
      {
        path: "usuario/add",
        element: <UsuarioFormPage />, // Añadir usuario
      },
      {
        path: "usuario/edit/:id",
        element: <UsuarioFormPage />, // Editar usuario
      },
      {
        path: "usuario/del/:id",
        element: <UsuarioDeletePage />, // Eliminar usuario
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
