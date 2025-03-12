import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";

import 'bootstrap/dist/css/bootstrap.min.css';

import UsuariosPage from "./pages/UsuariosPage"; 
import UsuarioFormPage from "./pages/UsuarioFormPage"; 
import UsuarioDeletePage from "./pages/UsuarioDeletePage"; 

import RootLayout from "./components/RootLayout";
import CrearReserva from "./components/CrearReserva";
import MisReservasBorrar from "./components/MisReservasBorrar";
import MisReservasEdit from "./components/MisReservasEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Ruta por defecto para "/"
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
        path: "instalacion/edit/:id", // Usando :id para capturar el parámetro
        element: <InstalacionFormPage />,
      },
      {
        path: "instalacion/del/:id", // Usando :id para capturar el parámetro
        element: <InstalacionDeletePage />,
      },
      {
        path: "mis-reservas",
        element: <ReservasPage />,
      },
      {
        path: "mis-reservas/add",
        element: <CrearReserva />,
      },
      {
        path: "mis-reservas/del/:id",
        element: <MisReservasBorrar />,
      },
      {
        path: "mis-reservas/edit/:id",
        element: <MisReservasEdit />,
      },
      {
        path: "usuarios",
        element: <UsuariosPage/>
      },
      {
        path: "usuarios/edit/:id",
        element: <UsuarioFormPage />,
      },
      {
        path: "usuarios/del/:id",
        element: <UsuarioDeletePage />,
      },
      {
        path: "usuarios/add",
        element: <UsuarioFormPage />, 
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;