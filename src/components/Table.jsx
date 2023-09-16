import PropTypes from "prop-types";

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
