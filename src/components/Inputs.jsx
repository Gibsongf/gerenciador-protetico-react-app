import PropTypes from "prop-types";
import { useTodosApi } from "./todosApiHook";

export function TipoTabelaSelect({ initialValue, onChange }) {
    return (
        <div className="tabela-options">
            <label htmlFor="tabela-options">Tipo de Tabela:</label>
            <select
                value={initialValue}
                onChange={onChange}
                name="tabela"
                id="tabela-options"
            >
                <option value="Normal">Normal</option>
                <option value="Reduzido">Reduzido</option>
            </select>
        </div>
    );
}
export function CepInput({ value, onChange }) {
    return (
        <div className="Cep">
            <label htmlFor="cep">Cep:</label>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name="cep"
                pattern="\d{5}\-?\d{3}"
                placeholder="xxxxx-xxx"
            ></input>
        </div>
    );
}
// Used for dentist form local dropdown option
export function LocalSelect({ onChange, initialValue }) {
    const data = useTodosApi("local");
    return (
        <div className="local-options">
            <label htmlFor="local-options">Local de Trabalho:</label>
            <select
                value={initialValue}
                onChange={onChange}
                name="local"
                id="local-options"
            >
                {data.map((local) => {
                    return (
                        <option key={local.id} value={local._id}>
                            {local.nome}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export function CpfInput({ value, onChange }) {
    return (
        <div className="cpf">
            <label htmlFor="cpf">CPF(formato: xxx.xxx.xxx-xx):</label>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name="cpf"
                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                title="Digite um CPF no formato: xxx.xxx.xxx-xx"
            ></input>
        </div>
    );
}
export function TelefoneInput({ value, onChange }) {
    return (
        <div>
            <label htmlFor="telefone">Telefone:</label>
            <input
                value={value}
                onChange={onChange}
                type="tel"
                name="telefone"
                id="telefone"
                placeholder="xxxxx-xxxx"
                pattern="[0-9]{5}-[0-9]{4}"
            />
        </div>
    );
}
export function SimpleTextInput({ labelTxt, id, value, onChange }) {
    return (
        <div className={id}>
            <label htmlFor={id}>{labelTxt}</label>
            <input
                type="text"
                name={id}
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

SimpleTextInput.propTypes = {
    id: PropTypes.string.isRequired,
    labelTxt: PropTypes.any,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
TelefoneInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
CpfInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
CepInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};

TipoTabelaSelect.propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.func,
};
// TipoTabelaSelect.defaultProps = {
//     initialValue: "Normal",
// };

LocalSelect.propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.any,
};
