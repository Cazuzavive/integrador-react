import { Link, Outlet } from "react-router-dom";
import LayoutStyle from "../css/Layout.module.css";
import Lista from "../assets/lista.png";
import Calculadora from "../assets/calculadora.png";

const Layout = () => {
    return (
        <>
            <header>
                <h1 className={LayoutStyle.title}>Cotizador de seguros de viaje en el Mercosur</h1>
                <Link to="/" title="Ver Cotizador" className={LayoutStyle.separador}>
                    <img src={Calculadora} />

                </Link>
                <Link to="/historial" title="Ver Historial" className={LayoutStyle.separador}>
                    <img src={Lista} />
                </Link>
            </header>
            <Outlet />
        </>
    )
};
export default Layout;