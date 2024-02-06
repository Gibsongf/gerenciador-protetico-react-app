import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../Api.js";
import PropTypes from "prop-types";

FormLogin.propTypes = {
    setToken: PropTypes.func,
};
export function FormLogin({ setToken }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = await apiLogin(formData);
        if (valid) {
            setToken(() => localStorage.getItem("token"));
            navigate("/servico/todos");
        }
    };
    return (
        <div className="login-container">
            <form
                onSubmit={handleSubmit}
                method="POST"
                action=""
                className="login-form"
            >
                <div className="username">
                    <label htmlFor="username">Nome de Usuário:</label>
                    <input
                        onChange={handleInputChange}
                        value={formData.username}
                        type="text"
                        id="username"
                        name="username"
                        required
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
                        required
                    />
                </div>
                <button className="login-enter" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
}
