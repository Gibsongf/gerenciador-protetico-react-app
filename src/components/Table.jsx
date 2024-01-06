import PropTypes from "prop-types";
import { useRef, useState } from "react";

NavSortTable.propTypes = {
    setDate: PropTypes.func,
    isDetails: PropTypes.bool,
    exportClick: PropTypes.func,
};
export function NavSortTable({ setDate, isDetails, exportClick }) {
    NavSortTable.propTypes = {
        setDate: PropTypes.func,
    };
    const [value, setValue] = useState("");
    const ref = useRef();
    const onChangeMonth = (e) => {
        console.log(e.target.value);
        // if(e.target.value === ''){
        //     onClickTodos()
        // }
        setDate(() => e.target.value);
        setValue(() => e.target.value);
    };
    const onClickTodos = () => {
        setValue(() => "");
        setDate(() => null);
        ref.current.value = "";
    };

    return (
        <div className="sort-nav">
            <h5>Mês: </h5>
            {/* <button className="todos-order-btn" onClick={onClickTodos}>
                Todos
            </button> */}
            {/* <label htmlFor="month">
                <strong>Mês: </strong>
            </label> */}
            <select ref={ref} id="month" value={value} onChange={onChangeMonth}>
                <option value="">Todos</option>
                <option value="01">Janeiro</option>
                <option value="02">Fevereiro</option>
                <option value="03">Março</option>
                <option value="04">Abril</option>
                <option value="05">Maio</option>
                <option value="06">Junho</option>
                <option value="07">Julho</option>
                <option value="08">Agosto</option>
                <option value="09">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
            </select>

            {isDetails ? <button onClick={exportClick}>Export</button> : ""}
        </div>
    );
}

export function Caption({ txt }) {
    Caption.propTypes = {
        txt: PropTypes.string,
    };

    return (
        <caption>
            <h3>{txt}</h3>
        </caption>
    );
}
export function TableRow({ rowNames }) {
    TableRow.propTypes = {
        rowNames: PropTypes.array,
    };

    return (
        <tr>
            {rowNames.map((name, index) => {
                return <th key={index + 10}>{name}</th>;
            })}
        </tr>
    );
}
