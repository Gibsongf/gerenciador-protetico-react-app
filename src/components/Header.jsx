import { NavLink } from "react-router-dom";

export function Header() {
    const style = {
        minWidth: "15vw",
        padding: "10px",
        // background: "white",
        // border: "solid white 1px",
        // color: "white",
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
