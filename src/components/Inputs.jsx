import PropTypes from "prop-types";
import { useDetailsApi, useTodosApi } from "./todosApiHook";
import { useEffect, useState } from "react";

export function TipoTabelaSelect({ initialValue, onChange }) {
    return (
        <div className="tabela-options">
            <label htmlFor="tabela-options">Tipo de Tabela</label>
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
export function CepInput({ value, onChange, msg }) {
    return (
        <div className="Cep">
            <label htmlFor="cep">Cep</label>
            <div className="error-message">{msg}</div>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name="cep"
                id="cep"
                pattern="\d{5}\-?\d{3}"
                placeholder="xxxxx-xxx"
                required
            ></input>
        </div>
    );
}
// Used for dentist form local dropdown option
export function SelectInput({
    onChange,
    initialValue,
    labelTxt,
    category,
    msg,
}) {
    const data = useTodosApi(category);

    if (!data) {
        return <div>Loading...</div>;
    }
    return (
        <div className="select-options">
            <label htmlFor={category}>{labelTxt}</label>
            <div className="error-message">{msg}</div>

            <select
                value={initialValue}
                onChange={onChange}
                name={`${category}`}
                id={category}
            >
                <option></option>

                {data.map((selectData) => {
                    return (
                        <option key={selectData._id} value={selectData._id}>
                            {selectData.nome}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
export function FilterDentistsByLocation({
    initialValue,
    onChange,
    dbId,
    msg,
}) {
    let data = useDetailsApi("local", dbId);
    const RenderOptions = () => {
        if (!dbId) {
            return <WaitSelectLocal />;
        }
        return data.dentistas.map((dentist) => {
            return (
                <option key={dentist._id} value={dentist._id}>
                    {dentist.nome}
                </option>
            );
        });
    };
    const WaitSelectLocal = () => {
        return <option value={null}>Selecione Local</option>;
    };
    return (
        <div className="select-options">
            <label htmlFor="dentista">Dentistas:</label>
            <div className="error-message">{msg}</div>
            <select
                value={initialValue}
                onChange={onChange}
                name="dentista"
                id="dentista"
            >
                <option></option>;
                {!data ? <WaitSelectLocal /> : <RenderOptions />}
            </select>
        </div>
    );
}

export function CpfInput({ value, onChange, msg }) {
    return (
        <div className="cpf">
            <label htmlFor="cpf">CPF</label>
            <div className="error-message">{msg}</div>
            <input
                value={value}
                onChange={onChange}
                type="text"
                name="cpf"
                id="cpf"
                pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
                placeholder="xxx.xxx.xxx-xx"
                required
            ></input>
        </div>
    );
}
export function TelefoneInput({ value, onChange, msg }) {
    return (
        <div>
            <label htmlFor="telefone">Telefone</label>
            <div className="error-message">{msg}</div>
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
export function SimpleInput({
    labelTxt,
    id,
    value,
    onChange,
    type = "text",
    msg,
}) {
    return (
        <div className={id}>
            <label htmlFor={id}>{labelTxt}</label>
            <div className="error-message">{msg}</div>
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
export function SearchProducts({ products, name, onChange }) {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    useEffect(() => {
        // console.log(search, products);
        const filter = () =>
            products.filter((item) => {
                if (item.nome.toLowerCase().includes(search.toLowerCase())) {
                    return item;
                }
            });
        if (products) {
            setResult(() => filter());
        }
    }, [search, products]);
    return (
        <div>
            <label htmlFor="search-product">Produto</label>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search-product"
                type="text"
                placeholder="Search..."
            />
            <select onChange={onChange} name={name} id="produto">
                <option value=""></option>
                {!result
                    ? ""
                    : result.map((r) => {
                          return (
                              <option key={r._id} value={r._id}>
                                  {r.nome}
                              </option>
                          );
                      })}
            </select>
        </div>
    );
}

SearchProducts.propTypes = {
    products: PropTypes.array,
};
SimpleInput.propTypes = {
    id: PropTypes.string.isRequired,
    labelTxt: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string,
    msg: PropTypes.string,
};
TelefoneInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    msg: PropTypes.string,
};
CpfInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    msg: PropTypes.string,
};
CepInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    msg: PropTypes.string,
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
    msg: PropTypes.string,
};
FilterDentistsByLocation.propTypes = {
    initialValue: PropTypes.string,
    onChange: PropTypes.any,
    dbId: PropTypes.string,
    msg: PropTypes.string,
};
