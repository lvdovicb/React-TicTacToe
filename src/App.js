import React, { Component } from 'react';
import './App.css';
import TicTacToeBoard from './TicTacToeBoard';
import Timer from './Timer';
import Chart from './Chart'


class App extends Component {
  render() {
    return (
      <div className="App">
        <TicTacToeBoard></TicTacToeBoard>
        <Timer></Timer>
        <Chart></Chart>
      </div>
    );
  }
}

export default App;
