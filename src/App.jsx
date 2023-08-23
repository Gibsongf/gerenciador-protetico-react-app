// import { useState } from 'react'
import { Header } from "./components/Header";

import { DentistasList } from "./pages/todos/DentistasList";
import { LocalList } from "./pages/todos/LocalList";
import { ProductList } from "./pages/todos/ProductList";
import { ServiçoList } from "./pages/todos/ServiçoList";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { FormDentist } from "./components/Form/FormDentist";
import { FormLocal } from "./components/Form/FormLocal";
import { FormService } from "./components/Form/FormService";
import { FormProduct } from "./components/Form/FormProduct";
import { FormLogin } from "./components/Form/FormLogin";

export const FormErrorMsg = createContext({
    errorMsg: {},
});

function App() {
    const token = localStorage.getItem("token");
    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }
    // Need to change phone format of saving and read todo of details
    return (
        <div className="App">
            <FormErrorMsg.Provider value={{ errorMsg: {} }}>
                <Header />
                <Routes>
                    <Route
                        path="/todos-dentistas"
                        element={<DentistasList />}
                    />
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
                {/* <FormDentist /> */}
                {/* <FormProduct /> */}
                {/* <FormService /> */}

                {/* Details */}
            </FormErrorMsg.Provider>
        </div>
    );
}

export default App;
