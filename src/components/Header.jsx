import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import srcLogo from "src/images/dglogoblack.png";

const ResponsiveLogo = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [windowWidth]);

    return (
        <>
            {windowWidth < 820 ? (
                ""
            ) : (
                <img src={srcLogo} alt="dg-logo" className="logo-header" />
            )}
        </>
    );
};

export function Header() {
    return (
        <>
            <div className="header">
                <ResponsiveLogo />
                <div className="nav">
                    <NavLink className="nav-btn" to="/servico/todos">
                        Serviços
                    </NavLink>
                    <NavLink className="nav-btn" to="/dentista/todos">
                        Dentistas
                    </NavLink>
                    <NavLink className="nav-btn" to="/local/todos">
                        Locais
                    </NavLink>
                    <NavLink className="nav-btn" to="/produtos/todos">
                        Produtos
                    </NavLink>
                </div>
            </div>
        </>
    );
}
