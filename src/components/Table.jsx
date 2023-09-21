import PropTypes from "prop-types";

export function NavSortTable({ setDate }) {
    NavSortTable.propTypes = {
        setDate: PropTypes.func,
    };
    const onChangeMonth = (e) => {
        setDate(() => e.target.value);
    };
    const onClickTodos = () => {
        setDate(() => null);
    };
    return (
        <div className="table-sort">
            <button onClick={onClickTodos}>Todos</button>
            <label htmlFor="month">Mês: </label>
            <input
                onChange={onChangeMonth}
                lang="pt-BR"
                type="month"
                name="month"
                id="month"
            />
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
