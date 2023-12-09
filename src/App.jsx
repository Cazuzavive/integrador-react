import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./componentes/Layout";
import Formulario from "./componentes/Formulario";
import Historial from "./componentes/Historial";
import NotFound from "./componentes/NotFound";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Formulario />} />
            <Route path="historial" element={<Historial />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App; 