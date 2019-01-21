import React from 'react';
import { Square } from '../Square/square';

class Board extends React.Component {
    renderSquare(i) {
        let won = false;
        if (this.props.sequence) {
            if (this.props.sequence.includes(i)) {
                won = true;
            }
        }
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onSquareClick={() => this.props.onBoardClick(i)}
                winner={won}
            />
        );
    }

    render() {
        const rows = 3;
        const columns = 3;
        let returnBoard = [];
        let id = 0;
        for(let i = 0; i < rows; i++) {
            let squares = [];
            for(let j = 0; j < columns; j++) {
                squares.push(this.renderSquare(id));
                id++;
            }
            returnBoard.push(<div key={i} className="board-row">{squares}</div>);
        }
        return (
            <div>{returnBoard}</div>
        );
    }
}

export { Board };