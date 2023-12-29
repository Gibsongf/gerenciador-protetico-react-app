import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter
        basename={
            import.meta.env.DEV ? "/" : "/gerenciador-protetico-react-app/"
        }
    >
        <App />
    </BrowserRouter>
);
