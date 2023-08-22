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
import { Route, Routes } from "react-router-dom";

export const FormErrorMsg = createContext({
    errorMsg: {},
});

{
    /* <Routes>
<Route path="cart" element={<Order />} />
<Route path="shop/*">
    <Route index element={<Shop />} />
    <Route path=":id" element={<ProductDetails />} />
</Route>
<Route path="/" element={<Home />} />
</Routes> */
}
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
