import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import EventsManager from './EventsManager';
import Api from './Api'
import {Doughnut} from 'react-chartjs-2';

class TicTacToeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: new Array(9),
            isX: true
        };
        EventsManager.addListener('next_player', () => {
            this.setState({ isX: !this.state.isX })
            EventsManager.emit('timer', 'start');
        });

    }
    renderCell(i) {
        return (
            <Cell
                value={this.state.cells[i]}
                cellKey={i}
                clickOnCell={this.clickOnCell} />
        );
    }
    createBoard(nbrCell) {
        let board = [];
        for (let i = 0; i < nbrCell; i++) {
            board.push(this.renderCell(i))
        }
        return board;
    }
    clickOnCell = (cellKey) => {
        let newCells = this.state.cells;
        newCells[cellKey] = this.state.isX ? "X" : "O"
        this.setState({ cells: newCells, isX: !this.state.isX })
        EventsManager.emit('timer', 'reset');
        EventsManager.emit('timer', 'start');
        if (TicTacToeBoard.hasWinner(newCells) || TicTacToeBoard.hasDraw(newCells)){
            return;
        }  
    }
    static hasDraw(cells){
        if(!cells.includes(undefined))
            return true;
    }
    static hasWinner(cells){
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0; i < wins.length; i ++){
            if(
                cells[wins[i][0]] != null &&
                cells[wins[i][0]] === cells[wins[i][1]] &&
                cells[wins[i][0]] === cells[wins[i][2]]
            ){
                return cells[wins[i][0]];
            }
        }
        return false;
    }
    saveGame = () => {
        Api.saveHistory(this.state.cells)
    }
    render() {
        let status;
        let winner = TicTacToeBoard.hasWinner(this.state.cells);
        if (winner) {
            status = 'The Winner is : ' + winner;
            
        } else {
            status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
        }
        if(TicTacToeBoard.hasDraw(this.state.cells))
            status = 'Draw';

        return (
            <div>         
                <div className="status">{status}</div>
                <div className="flex-container"> {this.createBoard(9)} </div>
                <button onClick={()=> this.saveGame()}>Save Game</button>
            </div>
        );
    }
}
export default TicTacToeBoard;