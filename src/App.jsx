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
function App() {
    const token = localStorage.getItem("token");
    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }

    return (
        <div className="App">
            <Header />
            <DentistasList />
            <LocalList />
            <ProductList />
            <ServiçoList />
            {/* <FormLocal /> */}
            {/* <FormDentist /> */}
            {/* <FormProduct /> */}
            {/* <FormService /> */}
        </div>
    );
}

export default App;
