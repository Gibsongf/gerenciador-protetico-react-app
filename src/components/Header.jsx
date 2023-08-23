import { Link } from "react-router-dom";

// /todos-dentistas
// /todos-locais
// /todos-servicos
// /todos-produtos
export function Header() {
    return (
        <>
            <div className="header">
                <div className="nav">
                    <h3>
                        <Link to="/todos-servicos">Serviços</Link>
                    </h3>
                    <h3>
                        <Link to="/dentista/todos">Dentistas</Link>
                    </h3>
                    <h3>
                        <Link to="/todos-locais">Locais</Link>
                    </h3>
                    <h3>
                        <Link to="/todos-produtos">Produtos</Link>
                    </h3>
                </div>
            </div>
        </>
    );
}
