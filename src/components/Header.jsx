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
        console.log(windowWidth);
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
    const style = {
        minWidth: "15vw",
        padding: "10px",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "5px",
        marginTop: "15px",
        transition: "transform 0.5s,background-color 0.5s",
    };

    return (
        <>
            <div className="header">
                <ResponsiveLogo />
                <div className="nav">
                    {/* <button onClick={onclick}> */}
                    <NavLink className="nav-btn" to="/servico/todos">
                        Serviços
                    </NavLink>
                    {/* </button> */}
                    <NavLink className="nav-btn" to="/dentista/todos">
                        Dentistas
                    </NavLink>
                    <NavLink className="nav-btn" to="/local/todos">
                        Locais
                    </NavLink>
                    <NavLink className="nav-btn" to="/todos-produtos">
                        Produtos
                    </NavLink>
                </div>
            </div>
        </>
    );
}
