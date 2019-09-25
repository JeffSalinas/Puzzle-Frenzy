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
            selector: [],
            selecterTop: { 
                row: 1,
                col: 0
            }
        };
    }

    componentDidMount() {
        this.mountLevel()
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