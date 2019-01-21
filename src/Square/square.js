import React from 'react';
import '../index.css';

function Square(props) {
    return (
        <button
            className={"square " + (props.winner ? "winner" : null)}
            onClick={props.onSquareClick}
        >
            {props.value}
        </button>
    );
}

export { Square };