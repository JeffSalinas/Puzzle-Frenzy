import React, {Component} from 'react';
import levels from './components/Levels';
import Row from './components/row.jsx';
import Popup from './components/popup.jsx';
import Out from './components/out.jsx';
const levelArray = Object.keys(levels);

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            start: true,
            level: 0,
            boardView: [],
            selectTop: { 
                row: 1,
                col: 0
            },
            move: 0,
            outOfMoves: false
        };
    }

    componentDidMount() {
        this.mountLevel()
        document.addEventListener("keydown", (event) => {
            this.move(event)
        });
    }

    turnToBrick(e, row, index) {
        let newBoard = this.state.boardView.map(array => {
            return array.slice();
        });
        newBoard[row][index] = './img/dots.png';
        this.setState(() => { return { boardView: newBoard } });
    }

    mountLevel() {
        let newBoard = []

        for (let i = 0; i < levels[levelArray[this.state.level]].board.length; i++) {
            let row = [];
            for (let j = 0; j < levels[levelArray[this.state.level]].board[i].length; j++) {
                row.push(levels[levelArray[this.state.level]].board[i][j]);
            }
            newBoard.push(row);
        }

        this.setState({ boardView: newBoard}, () => this.setSelector());
    }

    setSelector() {
        let newSelect = {
            row: 0,
            col: 0
        }
        for (let r = 0; r < 4; r++) {
            if (this.state.boardView[r][0] !== './img/empty.png') {
                newSelect.row = r;
                break;
            }
        }

        this.setState({ selectTop: newSelect});
    }

    move(event) {
        if (this.state.start) {
            if (this.state.start) {
                this.setState(() => { return { start: false }; });
            }
            if (event.key === 'Enter') {
                return;
            }
        }
        let currentMove = this.state.move;

        let newSelect = {
            row: this.state.selectTop.row,
            col: this.state.selectTop.col
        }


        if (event.key === 'ArrowLeft') {
            if (newSelect.col === 0) {
                return;
            }
            newSelect.col = newSelect.col - 1

        } else if (event.key === 'ArrowRight') {
            if (newSelect.col === 9) {
                return;
            }
            newSelect.col = newSelect.col + 1
            
        } else if (event.key === 'ArrowDown') {
            if (newSelect.row === 4) {
                return;
            }
            newSelect.row = newSelect.row + 1

        } else if (event.key === 'ArrowUp') {
            if (newSelect.row === 0) {
                return;
            }
            newSelect.row = newSelect.row - 1
        } else if (event.key === 'Enter') {
            currentMove++;
            this.swapBlocks();
        } else {
            return
        }

        this.setState(() => {
            return {selectTop: newSelect, move: currentMove}
        });
    };
    
    swapBlocks() {
        let row = this.state.selectTop.row;
        let col = this.state.selectTop.col;
        let newBoard = this.state.boardView.map(array => {
            return array.slice();
        });
        let temp = newBoard[row][col];

        newBoard[row][col] = newBoard[row + 1][col]
        newBoard[row + 1][col] = temp;

        this.setState({ boardView: newBoard }, () => this.shiftLeft());
    };

    shiftLeft() {
        let newBoard = this.state.boardView.map(array => {
            return array.slice();
        });
        
        newBoard.forEach((rowArray, rowIndex) => {
            let empty = [];
            for (let col = 0; col < rowArray.length; col++) {
                if (rowArray[col] === './img/empty.png') {
                    empty.push(col);
                }
                if (rowArray[col] === './img/black.png') {
                    newBoard[rowIndex][col] = './img/empty.png';
                    empty.push(col);
                }
            }
            empty.reverse();
            empty.forEach(colIndex => {
                newBoard[rowIndex].push(newBoard[rowIndex].splice(colIndex,1)[0]);
            });

        });
    
        this.setState({ boardView: newBoard }, () => {
            setTimeout(() => { this.checkMatches(); }, 350);
        });
    }

    checkMatches() {
        let newBoard = this.state.boardView.map(array => {
            return array.slice();
        });
        let change = false;
////////////////////////////////////////////////////////////////
////////////////////////  CHECK ROWS   /////////////////////////

        newBoard.forEach((rowArray, rowIndex) => {
            let count = {
                './img/box.png': 0,
                './img/dot.png': 0,
                './img/dots.png': 0,
                './img/four_box.png': 0,
                './img/smiley.png': 0
            }
            let prevBlock = '';

            for (let col = 0; col < rowArray.length; col++) {
                if (rowArray[col] === './img/empty.png' || rowArray[col] !== prevBlock) {
                    count['./img/box.png'] = 0;
                    count['./img/dot.png'] = 0;
                    count['./img/dots.png'] = 0;
                    count['./img/four_box.png'] = 0;
                    count['./img/smiley.png'] = 0 ;
                }
                if (rowArray[col] === './img/empty.png') {
                    continue;
                }


                prevBlock = rowArray[col];
                count[rowArray[col]]++;
                
                if (count[rowArray[col]] === 3) {
                    newBoard[rowIndex][col] = './img/black.png';
                    newBoard[rowIndex][col - 1] = './img/black.png';
                    newBoard[rowIndex][col - 2] = './img/black.png';
                    change = true;
                } else if (count[rowArray[col]] > 3) {
                    newBoard[rowIndex][col] = './img/black.png';
                }
            }
        });

////////////////////////////////////////////////////////////////
////////////////////////  CHECK COLUMNS   /////////////////////////
        for (let col = 0; col < newBoard[0].length; col++) {
            let count = {
                './img/box.png': 0,
                './img/dot.png': 0,
                './img/dots.png': 0,
                './img/four_box.png': 0,
                './img/smiley.png': 0
            }
            let prevBlock = '';

            for (let row = 0; row < newBoard.length; row++) {
                if (newBoard[row][col] === './img/empty.png' || newBoard[row][col] !== prevBlock) {
                    count['./img/box.png'] = 0;
                    count['./img/dot.png'] = 0;
                    count['./img/dots.png'] = 0;
                    count['./img/four_box.png'] = 0;
                    count['./img/smiley.png'] = 0;
                }
                if (newBoard[row][col] === './img/empty.png') {
                    continue;
                }

                prevBlock = newBoard[row][col];
                count[newBoard[row][col]]++;

                if (count[newBoard[row][col]] === 3) {
                    newBoard[row][col] = './img/black.png';
                    newBoard[row - 1][col] = './img/black.png';
                    newBoard[row - 2][col] = './img/black.png';
                    change = true;
                } else if (count[newBoard[row][col]] > 3) {
                    newBoard[row][col] = './img/black.png';
                }
            }
        }

////////
        if (change) {
            this.setState({ boardView: newBoard}, () => {
                setTimeout(() => this.shiftLeft(), 400);
                
            });
        } else {
            this.checkCompete();
        }
    };

    checkCompete() {
        let newBoard = this.state.boardView.map(array => {
            return array.slice();
        });
        let win = true;

        newBoard = newBoard.flat()
        for (let block of newBoard) {
            if (block !== './img/empty.png') {
                win = false;
            }
        }
        if (win) {
            this.setState({ level: this.state.level + 1, start: true, move: 0 }, () => this.mountLevel());
            return;
        } else if (this.state.move === levels[levelArray[this.state.level]].moves) {
            this.setState({ move: 0, start: true, outOfMoves: true }, () => {
                setTimeout(() => {
                    this.setState({ outOfMoves: false }, () => { 
                        this.mountLevel();
                    });
                }, 900);
            });
        }
        return;
    }

    render() {

        return (
            <div id="container">
                { this.state.start ? <Popup level={levels[levelArray[this.state.level]]} currentlvl={this.state.level + 1}/> : null }
                {this.state.outOfMoves ? <Out /> : null }
                <div id="gameBoard">
                    {this.state.boardView.map((row, index) => {
                        return (
                            <Row
                                selectTop={this.state.selectTop}
                                row={row}
                                turnToBrick = { this.turnToBrick.bind(this) }
                                rowIndex = { index }
                                key = { index }
                            />
                        )
                    })}
                </div>
                <div id="bottomSpace"></div>
            </div>
        )
    }
}

export default App;