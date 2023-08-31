// import { useState } from 'react'
import { Header } from "./components/Header";

import { DentistasList } from "./pages/todos/DentistasList";
import { LocalList } from "./pages/todos/LocalList";
import { ProductList } from "./pages/todos/ProductList";
import { ServiçoList } from "./pages/todos/ServiçoList";
import { createContext } from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./styles/App.css";
import { FormDentist } from "./components/Form/FormDentist";
import { FormLocal } from "./components/Form/FormLocal";
// import { FormService } from "./components/Form/FormService";
// import { FormProduct } from "./components/Form/FormProduct";
import { FormLogin } from "./components/Form/FormLogin";
import { Details } from "./pages/Details";
import { FormService } from "./components/Form/FormService";

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
                <Routes>
                    <Route path="/dentista">
                        <Route
                            path="/dentista/todos"
                            element={<DentistasList />}
                        />
                        <Route
                            path="/dentista/:id"
                            element={<Details type="dentista" />}
                        />
                    </Route>
                    <Route path="/servico">
                        <Route
                            path="/servico/todos"
                            element={<ServiçoList />}
                        />
                        <Route
                            path="/servico/:id"
                            element={<Details type="servico" />}
                        />
                    </Route>
                    <Route path="/local">
                        <Route path="/local/todos" element={<LocalList />} />
                        <Route
                            path="/local/:id"
                            element={<Details type="local" />}
                        />
                    </Route>
                    <Route path="/todos-produtos" element={<ProductList />} />
                </Routes>
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
                <FormService />

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
