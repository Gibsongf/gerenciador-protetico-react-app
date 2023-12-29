import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ResponsiveLogo = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const style = {
        width: "20vw",
    };
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
                <img style={style} src="../src/assets/dglogoblack.png" alt="" />
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
                    <NavLink
                        className="nav-btn"
                        to="/gerenciador-protetico/servico/todos"
                    >
                        Serviços
                    </NavLink>
                    <NavLink
                        className="nav-btn"
                        to="/gerenciador-protetico/dentista/todos"
                    >
                        Dentistas
                    </NavLink>
                    <NavLink
                        className="nav-btn"
                        to="/gerenciador-protetico/local/todos"
                    >
                        Locais
                    </NavLink>
                    <NavLink
                        className="nav-btn"
                        to="/gerenciador-protetico/produtos/todos"
                    >
                        Produtos
                    </NavLink>
                </div>
            </div>
        </>
    );
}
