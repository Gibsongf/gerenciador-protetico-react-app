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
                required
            ></input>
        </div>
    );
}
// Used for dentist form local dropdown option
export function SelectInput({ onChange, initialValue, labelTxt, category }) {
    const data = useTodosApi(category);

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div className="select-options">
            <label htmlFor="options">{labelTxt}</label>
            <select
                value={initialValue}
                onChange={onChange}
                name={`${category}`}
                id="options"
            >
                {data.map((local) => {
                    return (
                        <option key={local._id} value={local._id}>
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
            <label htmlFor="cpf">CPF:</label>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name="cpf"
                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                placeholder="xxx.xxx.xxx-xx"
                required
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
                required
            />
        </div>
    );
}
export function SimpleInput({ labelTxt, id, value, onChange, type = "text" }) {
    return (
        <div className={id}>
            <label htmlFor={id}>{labelTxt}</label>
            <input
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

SimpleInput.propTypes = {
    id: PropTypes.string.isRequired,
    labelTxt: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
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

SelectInput.propTypes = {
    category: PropTypes.string,
    initialValue: PropTypes.string,
    onChange: PropTypes.any,
    labelTxt: PropTypes.string,
};
