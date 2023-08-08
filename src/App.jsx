// import { useState } from 'react'
import { DentistasList } from "./components/DentistasList";
import { FormLogin } from "./components/FormLogin";
import { Header } from "./components/Header";
import { LocalList } from "./components/LocalList";
import "./styles/App.css";
function App() {
    const token = localStorage.getItem("token");
    // If has token and is valid send to index else delete token and redirect login
    if (!token) {
        return <FormLogin />;
    }

    return (
        <div className="App">
            <Header />
            <LocalList />
        </div>
    );
}

export default App;
