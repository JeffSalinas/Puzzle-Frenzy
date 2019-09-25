import React, {Component} from 'react';
import levels from './components/Levels';
import Row from './components/row.jsx';
const levelArray = Object.keys(levels);

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 0,
            boardView: [],
            selecterTop: { 
                row: 1,
                col: 0
            }
        };
    }

    componentDidMount() {
        this.mountLevel()
        document.addEventListener("keydown", (event) => {
            this.move(event)
        });
    }


    turnToBrick(e, row, index) {
        let newBoard = this.state.boardView.slice();
        newBoard[row][index] = './img/dots.png';
        this.setState(() => { return { boardView: newBoard } });
    }

    mountLevel() {
        let newBoard = []
        let newSelector = [];

        for (let i = 0; i < levels[levelArray[this.state.level]].length; i++) {
            let row = [];
            for (let j = 0; j < levels[levelArray[this.state.level]][i].length; j++) {
                row.push(levels[levelArray[this.state.level]][i][j]);
            }
            newBoard.push(row);
        }


        this.setState({ boardView: newBoard, selector: newSelector }, () => console.log('made board!'))
    }

    move(event) {
        let newBoard = this.state.boardView.slice();
        let newSelector = {
            row: this.state.selecterTop.row,
            col: this.state.selecterTop.col
        }

        if (event.key === 'ArrowLeft') {
            if (newSelector.col === 0) {
                return;
            }
            newSelector.col = newSelector.col - 1

        } else if (event.key === 'ArrowRight') {
            if (newSelector.col === 9) {
                return;
            }
            newSelector.col = newSelector.col + 1
            
        } else if (event.key === 'ArrowDown') {
            if (newSelector.row === 4) {
                return;
            }
            newSelector.row = newSelector.row + 1

        } else if (event.key === 'ArrowUp') {
            if (newSelector.row === 0) {
                return;
            }
            newSelector.row = newSelector.row - 1
        } else {
            return
        }
        this.setState({selecterTop: newSelector}, () => console.log('moved'))
    }

    render() {
        return (
            <div id="container">
                <div id="gameBoard">
                    {this.state.boardView.map((row, index) => {
                        return (
                            <Row
                                selecterTop={this.state.selecterTop}
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