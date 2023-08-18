// import { useState } from 'react'
import { DentistasList } from "./pages/todos/DentistasList";
import { FormLogin } from "./components/FormLogin";
import { Header } from "./components/Header";
import { LocalList } from "./pages/todos/LocalList";
import { ProductList } from "./pages/todos/ProductList";
import { ServiçoList } from "./pages/todos/ServiçoList";
import "./styles/App.css";
import {
    FormDentist,
    FormLocal,
    FormProduct,
    FormService,
} from "./components/Form";
import { createContext } from "react";

export const FormErrorMsg = createContext({
    errorMsg: {},
});
function App() {
    const token = localStorage.getItem("token");
    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }

    return (
        <div className="App">
            <FormErrorMsg.Provider value={{ errorMsg: {} }}>
                <Header />
                <LocalList />
                {/* <DentistasList />
            <LocalList />
            <ProductList />
            <ServiçoList /> */}
                <FormLocal />
                {/* <FormDentist />
            <FormProduct />
            <FormService /> */}
            </FormErrorMsg.Provider>
        </div>
    );
}

export default App;
