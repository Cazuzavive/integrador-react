import { Link, Outlet } from "react-router-dom";
import LayoutStyle from "../css/Layout.module.css"

const Layout = () => {
    return (
        <>
            <header>
                <h1 className={LayoutStyle.title}>Cotizador de seguros de viaje en el Mercosur</h1>
                <h4>Nuestra compañia ofrece cobertura por al menos siete dias, y como maximo seis meses.</h4>
                <Link to="/" title="Ver Formulario">
                    Formulario
                </Link>
                <Link to="/historial" title="Ver Historial">
                    Historial
                </Link>
            </header>
            <Outlet />
        </>
    )
};
export default Layout;