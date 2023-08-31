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
                    <button>
                        <Link to="/servico/todos">Serviços</Link>
                    </button>
                    <button>
                        <Link to="/dentista/todos">Dentistas</Link>
                    </button>
                    <button>
                        <Link to="/local/todos">Locais</Link>
                    </button>
                    <button>
                        <Link to="/todos-produtos">Produtos</Link>
                    </button>
                </div>
            </div>
        </>
    );
}
