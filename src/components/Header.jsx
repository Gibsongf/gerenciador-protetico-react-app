import { NavLink } from "react-router-dom";

export function Header() {
    const style = {
        minWidth: "15vw",
        padding: "10px",
        // background: "white",
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "5px",
        marginTop: "15px",
        transition: "transform 0.5s,background-color 0.5s",
    };

    return (
        <>
            <div className="header">
                <div className="nav">
                    {/* <button onClick={onclick}> */}
                    <NavLink id="nav-btn" style={style} to="/servico/todos">
                        Serviços
                    </NavLink>
                    {/* </button> */}
                    <NavLink style={style} to="/dentista/todos">
                        Dentistas
                    </NavLink>
                    <NavLink style={style} to="/local/todos">
                        Locais
                    </NavLink>
                    <NavLink style={style} to="/todos-produtos">
                        Produtos
                    </NavLink>
                </div>
            </div>
        </>
    );
}
