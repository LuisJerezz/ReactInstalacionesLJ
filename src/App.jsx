import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import InstalacionesPage from "./pages/InstalacionesPage";
import InstalacionDeletePage from "./pages/InstalacionDeletePage";
import InstalacionFormPage from "./pages/InstalacionFormPage";
import ReservasPage from "./pages/ReservasPage";
import ReservaFormPage from "./pages/ReservaFormPage"; // Añade la página de formulario
import ReservaDeletePage from "./pages/ReservaDeletePage"; // Añade la página de eliminar reserva

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, // Esto indica que es la ruta por defecto para "/"
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
        element: <ReservaFormPage />, // Ruta para añadir una reserva
      },
      {
        path: "mis-reservas/edit/:id",
        element: <ReservaFormPage />, // Ruta para editar una reserva
      },
      {
        path: "mis-reservas/del/:id",
        element: <ReservaDeletePage />, // Ruta para eliminar una reserva
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
