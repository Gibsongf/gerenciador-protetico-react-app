import { Header } from "./components/Header";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { DentistaDetails, LocalDetails } from "./pages/Details";
import {
    TodosDentistas,
    TodosLocais,
    TodosProdutos,
    TableService,
} from "./pages/Todos";

export const AppContext = createContext({
    errorMsg: {},
});
const Content = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Routes>
                    <Route
                        path="/gerenciador-protetico-react-app"
                        element={<TableService />}
                    />
                    <Route path="/dentista">
                        <Route
                            path="/dentista/todos"
                            element={<TodosDentistas />}
                        />
                        <Route
                            path="/dentista/:id"
                            element={<DentistaDetails />}
                        />
                    </Route>
                    <Route path="/servico">
                        <Route
                            path="/servico/todos"
                            element={<TableService />}
                        />
                    </Route>
                    <Route path="/local">
                        <Route path="/local/todos" element={<TodosLocais />} />
                        <Route path="/local/:id" element={<LocalDetails />} />
                    </Route>
                    <Route path="/produtos/todos" element={<TodosProdutos />} />
                </Routes>
            </div>
        </>
    );
};
function App() {
    const token = localStorage.getItem("token");

    return (
        <div className="App">
            <AppContext.Provider value={{ errorMsg: {} }}>
                {token ? <Content /> : "<FormLogin />"}
            </AppContext.Provider>
        </div>
    );
}

export default App;
