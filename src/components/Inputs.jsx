import PropTypes from "prop-types";
import { useDetailsApi, useTodosApi } from "./ApiHooks";
import { useContext, useEffect, useState } from "react";
import { RefContext } from "./Form/FormService";

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
    // console.log(initialValue);
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
    let { data } = useDetailsApi("local", dbId);
    // console.log(initialValue);
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
    // console.log(initialValue);
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
                <option></option>
                {!data ? "" : <RenderOptions />}
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
export function EntregaStatus({ onChange, value }) {
    return (
        <div className="status-entrega">
            <label htmlFor="status-entrega">Finalizado:</label>
            <select
                name="status-entrega"
                id="status-entrega"
                onChange={onChange}
                value={value}
            >
                <option value={true}>Não</option>
                <option value={false}>Sim</option>
            </select>
        </div>
    );
}
// just load one of these when user confirm the product
// it will be show as checkbox above with it check and reset the search
// if is a edit case the checkbox will already be rendered and the user can uncheck it
const getNameValue = (arr) => {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.map((a) => {
        return { name: a.nome, value: a._id };
    });
};
export function SearchProducts({
    products,
    name,
    onChange,
    preSelectProduct,
    msg,
}) {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [selectNames, setSelectNames] = useState(
        getNameValue(preSelectProduct)
    );
    const [saveName, setSaveName] = useState([]);
    const beforeSaveData = (e) => {
        if (e.target.value !== "") {
            const name = e.target.options[e.target.selectedIndex].text;
            setSaveName({ name, value: e.target.value });
        }
        onChange(e);
    };
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
    const saveSelectedName = () => {
        if (saveName.length < 1) return;
        setSelectNames((prev) => [...prev, saveName]);
        // setProduct((prev) => [...prev, saveName]);
    };
    return (
        <div className="search-product">
            <label htmlFor="search-product">Produto:</label>
            <div className="error-message">{msg}</div>

            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search-product"
                id="search-product"
                type="text"
                placeholder="Search..."
            />

            <select onChange={beforeSaveData} name={name} id="produto">
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
            <button onClick={saveSelectedName} type="button">
                Selecionar Produto
            </button>
            <div htmlFor="selected-products">Selecionado:</div>
            <RenderCheckBox arr={selectNames} />
        </div>
    );
}
function RenderCheckBox({ arr }) {
    RenderCheckBox.propTypes = {
        arr: PropTypes.array,
    };
    const { checkBoxRef } = useContext(RefContext);

    if (arr.length < 1) {
        return;
    }
    return (
        <div ref={checkBoxRef} className="selected-checkbox">
            {arr.map((item, indx) => {
                if (item.length < 1) return;
                return (
                    <CheckBox
                        key={item + indx}
                        name={item.name}
                        value={item.value}
                    />
                );
            })}
        </div>
    );
}
function CheckBox({ name, value }) {
    const [isChecked, setIsChecked] = useState(true);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className="checkbox-label">
            <input
                name="produto"
                type="checkbox"
                checked={isChecked}
                value={value}
                onChange={handleCheckboxChange}
            />
            {name}
        </label>
    );
}
SearchProducts.propTypes = {
    products: PropTypes.array,
};
SimpleInput.propTypes = {
    id: PropTypes.string.isRequired,
    labelTxt: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    type: PropTypes.string,
    msg: PropTypes.string,
};
TelefoneInput.propTypes = {
    value: PropTypes.any,
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
    initialValue: PropTypes.any,
    onChange: PropTypes.any,
    dbId: PropTypes.string,
    msg: PropTypes.string,
};
