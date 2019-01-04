import React from "react";

function Cell(props) {
    return (
        <button className="flex-item" onClick={() => props.clickOnCell(props.cellKey)}>
			{props.value}
        </button>
    );
}

export default Cell;