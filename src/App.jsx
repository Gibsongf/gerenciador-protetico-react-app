import { Header } from "./components/Header";
import { createContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./styles/App.css";
import { DentistaDetails, LocalDetails } from "./pages/Details";
import {
    TodosDentistas,
    TodosLocais,
    TodosProdutos,
    TableService,
} from "./pages/Todos";
import { FormLogin } from "./components/Form/FormLogin";

export const AppContext = createContext({
    errorMsg: {},
});
const Content = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route
                    path="gerenciador-protetico-react-app"
                    element={<TableService />}
                />
                <Route path="gerenciador-protetico-react-app/*">
                    <Route path="dentista/*">
                        <Route path="todos/" element={<TodosDentistas />} />
                        <Route path=":id/" element={<DentistaDetails />} />
                    </Route>
                    <Route path="servico/todos" element={<TableService />} />

                    <Route path="local/*">
                        <Route path="todos/" element={<TodosLocais />} />
                        <Route path=":id/" element={<LocalDetails />} />
                    </Route>
                    <Route path="produtos/todos" element={<TodosProdutos />} />
                </Route>
            </Routes>
        </>
    );
};
function App() {
    const nav = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    return (
        <div className="App">
            <AppContext.Provider value={{ errorMsg: {} }}>
                {token ? <Content /> : <FormLogin />}
            </AppContext.Provider>
        </div>
    );
}

export default App;
