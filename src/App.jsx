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
import { FormService } from "./components/Form/FormService";
import { FormProduct } from "./components/Form/FormProduct";
import { FormLogin } from "./components/Form/FormLogin";
import { DentistaDetails } from "./pages/detalhes/DentistaDetails";
import { LocalDetails } from "./pages/detalhes/LocalDetails";
import { ServiçoDetails } from "./pages/detalhes/ServiçoDetails";
import { ProdutoDetails } from "./pages/detalhes/ProdutoDetails";

export const AppContext = createContext({
    errorMsg: {},
    saveDbId: () => {},
});
function App() {
    const token = localStorage.getItem("token");

    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }
    const saveDbId = (e) => {
        localStorage.setItem("dbID", e.target.id);
    };
    // Need to change phone format of saving and read todo of details
    Router;
    return (
        <div className="App">
            <AppContext.Provider value={{ errorMsg: {}, saveDbId }}>
                <Header />
                <Routes>
                    <Route path="/dentista">
                        <Route
                            path="/dentista/todos"
                            element={<DentistasList />}
                        />
                        <Route
                            path="/dentista/:id"
                            element={<DentistaDetails />}
                        />
                    </Route>
                    <Route path="/todos-locais" element={<LocalList />} />
                    <Route path="/todos-servicos" element={<ServiçoList />} />
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
                <FormDentist />
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
