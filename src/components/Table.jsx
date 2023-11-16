import PropTypes from "prop-types";
import { useRef } from "react";

export function NavSortTable({ setDate }) {
    NavSortTable.propTypes = {
        setDate: PropTypes.func,
    };
    const ref = useRef();
    const onChangeMonth = (e) => {
        setDate(() => e.target.value);
    };
    const onClickTodos = () => {
        setDate(() => null);
        ref.current.value = "";
    };
    const btnStyle = {
        fontWeight: "bold",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "White",
    };
    return (
        <div className="table-sort">
            <h5 style={{ fontSize: "1.1em" }}>Ordenar: </h5>
            <button onClick={onClickTodos} style={btnStyle}>
                Todos
            </button>
            <label htmlFor="month">
                / Mês:{" "}
                <input
                    style={{ width: "160px" }}
                    ref={ref}
                    onChange={onChangeMonth}
                    lang="pt-BR"
                    type="month"
                    name="month"
                    id="month"
                />
            </label>
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
