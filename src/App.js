import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import Play from './Play';

class App extends Component {
  constructor(props) {
         super(props);

         let cells = [];
         let activeCells = [];
         let nextActiveCells = [];

         this.state = {
             cells,
             activeCells,
             nextActiveCells
         };

         for (let i = 0; i < 400; i++) {
           let on = Math.floor(Math.random() * 2);
           activeCells.push(on);
           nextActiveCells.push(on);
           cells.push(<Cell id={i} key={i} active={this.state.activeCells[i]} onClick={(cell, alive) => this.onClick(cell, alive)} />);
         }

         this.generations = 0;

         this.interval = setInterval(() => {
            this.calculateNext();
            this.stepForward();
            this.generations++;
          }, 100);

         window.addEventListener("keydown", (event) => {
           switch (event.key) {
             case " ":
               this.calculateNext();
               this.stepForward();
               this.generations++;
               break;
           }
         });
     }

  onClick(cell, alive) {
      let cells = this.state.cells;
      let activeCells = this.state.activeCells;

      activeCells[cell.target.id] = alive;
      cells[cell.target.id] = <Cell id={cell.target.id} key={cell.target.id} active={this.state.activeCells[cell.target.id]} onClick={(cell, alive) => this.onClick(cell, alive)} />;

      this.setState({cells,
                    activeCells});

      this.calculateNext();
  }

  calculateNext() {
    let activeCells = this.state.activeCells;
    let nextActiveCells = this.state.nextActiveCells;

    for (var i = 0; i < this.state.cells.length ; i++) {
      let neighbours = 0;
      let total = Math.sqrt(this.state.cells.length);
      let row = Math.floor(i / total);
      let column = i - row * total;

      // Check above-left
      if (this.selectedNeighbour(row-1, column-1)) {
        // console.log('Above left Neighbor found for ' + i);
        neighbours++;
      }

      // Check above
      if (this.selectedNeighbour(row-1, column)) {
        neighbours++;
        // console.log('Above Neighbor found for ' + i);
      }

      // Check above-right
      if (this.selectedNeighbour(row-1, column+1)) {
        neighbours++;
        // console.log('Above right Neighbor found for ' + i);
      }

      // Check left
      if (this.selectedNeighbour(row, column-1)) {
        neighbours++;
        // console.log('Left Neighbor found for ' + i);
      }

      // Check right
      if (this.selectedNeighbour(row, column+1)) {
        neighbours++;
        // console.log('Right Neighbor found for ' + i);
      }

      // Check below-left
      if (this.selectedNeighbour(row+1, column-1)) {
        neighbours++;
        // console.log('Below left Neighbor found for ' + i);
      }

      // Check below
      if (this.selectedNeighbour(row+1, column)) {
        neighbours++;
        // console.log('Below Neighbor found for ' + i);
      }

      // Check below-right
      if (this.selectedNeighbour(row+1, column+1)) {
        neighbours++;
        // console.log('Below right Neighbor found for ' + i);
      }

      // Set new state based on neighbours
      if (neighbours < 2 || neighbours > 3) {
        nextActiveCells[i] = false; // Dead
      } else if (neighbours === 3) {
        nextActiveCells[i] = true;
      } else {
        nextActiveCells[i] = activeCells[i];
      }
    }

    this.setState({nextActiveCells});
  }

  stepForward() {
    let activeCells = this.state.activeCells;
    let nextActive = this.state.nextActiveCells;
    let cells = this.state.cells;

    for (var i = 0; i < this.state.activeCells.length; i++) {
      activeCells[i] = nextActive[i];
      cells[i] = <Cell id={i} key={i} active={activeCells[i]} onClick={(cell, alive) => this.onClick(cell, alive)} />;
    }

    this.setState({cells,
                  activeCells});
  }

  selectedNeighbour(row, col) {
    let total = Math.sqrt(this.state.cells.length);

    if (row === -1) {
      row = total - 1;
    }
    if (row === total) {
      row = 0;
    }
    if (col === -1) {
      col = total - 1;
    }
    if (col === total) {
      col = 0;
    }

    let id = row * total + col;
    return this.state.activeCells[id];
  }

  playButton(event) {
    console.log(event);
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = 0;
    } else {
      this.interval = setInterval(() => {
         this.calculateNext();
         this.stepForward();
         this.generations++;
       }, 100);
    }
  }

  clearBoard() {
    let nextActiveCells = this.state.nextActiveCells;
    for (var i = 0; i < 400; i++) {
      nextActiveCells[i] = false;
    }

    this.generations = 0;
    this.setState({nextActiveCells});
    this.stepForward();
  }

  render() {
    return (
      <div className="app">
        <h1>Game of Life</h1>
        {this.state.cells}
        <Play onActivate={(button) => this.playButton(button)} />
        <button onClick={() => this.clearBoard()}>Clear</button>
        {this.generations}
        <p>Created for FreeCodeCamp.  <a href="https://github.com/dkohlruss/game-of-life">Sourcecode available on github.</a></p>
      </div>


    );
  }
}

export default App;
