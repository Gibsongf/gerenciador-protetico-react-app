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
import { FormLogin } from "./components/Form/FormLogin";

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
                        path="gerenciador-protetico"
                        element={<TableService />}
                    />
                    <Route path="gerenciador-protetico/*">
                        <Route path="dentista/*">
                            <Route path="todos/" element={<TodosDentistas />} />
                            <Route path=":id/" element={<DentistaDetails />} />
                        </Route>
                        <Route
                            path="servico/todos"
                            element={<TableService />}
                        />

                        <Route path="local/*">
                            <Route path="todos/" element={<TodosLocais />} />
                            <Route path=":id/" element={<LocalDetails />} />
                        </Route>
                        <Route
                            path="produtos/todos"
                            element={<TodosProdutos />}
                        />
                    </Route>
                </Routes>
            </div>
        </>
    );
};
function App() {
    const token = localStorage.getItem("token");
    FormLogin;
    return (
        <div className="App">
            <AppContext.Provider value={{ errorMsg: {} }}>
                {token ? <Content /> : <FormLogin />}
            </AppContext.Provider>
        </div>
    );
}

export default App;
