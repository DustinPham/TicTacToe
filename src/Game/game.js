import React from 'react';
import { Board } from '../Board/board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: {
                    row: '',
                    column: ''
                }
            }],
            stepNumber: 0,
            xIsNext: true,
            reverse: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        const column = i % 3;
        let row = 2;
        if (i >= 0 && i < 3) {
            row = 0;
        } else if (i >= 3 && i < 6) {
            row = 1;
        }

        const position = {
            row: row,
            column: column
        };

        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{
                squares: squares,
                position: position
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            reverse: this.state.reverse
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            if (winner === 'Draw') {
                status = 'Draw';
            } else {
                status = 'Winner: ' + winner.player;
            }
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let moves = history.map((currentValue, index) => {
            const position = ' (' + currentValue.position.row + ', ' + currentValue.position.column + ')';
            const desc = index ?
                'Go to move #' + index + position:
                'Go to game start';

            return (
                <li key={index}>
                    <button
                        onClick={() => this.jumpTo(index)}
                        style={{fontWeight: index === history.length - 1 ? 'bold' : 'normal'}}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        if (this.state.reverse) {
            moves = moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onBoardClick={(i) => {this.handleClick(i)}}
                        sequence={winner ? winner.sequence : null}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => {
                        this.setState({
                            reverse: !this.state.reverse
                        })
                    }}>Sort Moves</button>
                    <ol reversed={this.state.reverse}>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
            return {
                player: squares[a],
                sequence: [a, b, c]
            };
        }
    }

    if (!squares.includes(null)) {
        return "Draw";
    }

    return null;
}

export { Game };