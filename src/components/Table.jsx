import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { booleanToString } from "../utils";

export function Caption({ txt }) {
    Caption.propTypes = {
        txt: PropTypes.string,
    };
    return (
        <caption>
            <h4>{txt}</h4>
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
