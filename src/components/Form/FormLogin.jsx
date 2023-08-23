import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../Api";

export function FormLogin() {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // newContentValidator(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await apiLogin(formData);
        if (valid) {
            console.log("redirect to index page");
            // navigate('/')
        }
    };
    return (
        <form method="POST" action="" className="login-form">
            <div className="username">
                <label htmlFor="username">Nome de Usuário:</label>
                <input
                    onChange={handleInputChange}
                    value={formData.username}
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div className="password">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                />
            </div>
            <button onClick={handleSubmit} type="submit">
                Entrar
            </button>
        </form>
    );
}
