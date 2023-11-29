// import { useState } from 'react'
import { Header } from "./components/Header";

import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
// import { FormDentist } from "./components/Form/FormDentist";
// import { FormLocal } from "./components/Form/FormLocal";
// import { FormService } from "./components/Form/FormService";
// import { FormProduct } from "./components/Form/FormProduct";
import { FormLogin } from "./components/Form/FormLogin";
// import { FormService } from "./components/Form/FormService";
import { DentistaDetails, LocalDetails, ServiceDetails } from "./pages/Details";
import {
    TodosDentistas,
    TodosLocais,
    TodosProdutos,
    TableService,
} from "./pages/Todos";

export const AppContext = createContext({
    errorMsg: {},
});

function App() {
    const token = localStorage.getItem("token");

    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }
    // Need to change phone format of saving

    return (
        <div className="App">
            <AppContext.Provider value={{ errorMsg: {} }}>
                <Header />
                <div className="content">
                    <Routes>
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
                            <Route
                                path="/servico/:id"
                                element={<ServiceDetails />}
                            />
                        </Route>
                        <Route path="/local">
                            <Route
                                path="/local/todos"
                                element={<TodosLocais />}
                            />
                            <Route
                                path="/local/:id"
                                element={<LocalDetails />}
                            />
                        </Route>
                        <Route
                            path="/todos-produtos"
                            element={<TodosProdutos />}
                        />
                    </Routes>
                </div>

                {/* All List  */}
                {/* <LocalList /> */}
                {/* <DentistasList />*/}
                {/* <LocalList /> */}
                {/* <ProductList /> */}
                {/* <ServiçoList /> */}

                {/* Forms */}
                {/* <FormLocal /> */}
                {/* <FormDentist /> */}
                {/* <FormProduct /> */}
                {/* <FormService /> */}

                {/* Details */}
                {/* <DentistaDetails /> */}
                {/* <LocalDetails/> */}
                {/* <ServiçoDetails/> */}
                {/* <ProdutoDetails/> */}
            </AppContext.Provider>
        </div>
    );
}

export default App;
