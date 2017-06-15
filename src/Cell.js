import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
         super(props);

         let randGenerate = Math.random() * 2;
         let alive = false;
         if (randGenerate > 1) {
           alive = true;
         }

         this.state = {
           alive,
           nextState: false
         };

         this.props.selected[this.props.id] = this;

         window.addEventListener("keydown", (event) => {
           switch (event.key) {
             case " ":
               this.stepForward();
               break;
           }
         });
  }

  calculate() {
    let neighbours = 0;
    let total = Math.sqrt(this.props.selected.length);
    let row = Math.floor(this.props.id / total);
    let column = this.props.id - row * total;

    // Check above-left
    if (this.selectedNeighbour(row-1, column-1)) {
      neighbours++;
    }

    // Check above
    if (this.selectedNeighbour(row-1, column)) {
      neighbours++;
    }

    // Check above-right
    if (this.selectedNeighbour(row-1, column+1)) {
      neighbours++;
    }

    // Check left
    if (this.selectedNeighbour(row, column-1)) {
      neighbours++;
    }

    // Check right
    if (this.selectedNeighbour(row, column+1)) {
      neighbours++;
    }

    // Check below-left
    if (this.selectedNeighbour(row+1, column-1)) {
      neighbours++;
    }

    // Check below
    if (this.selectedNeighbour(row+1, column)) {
      neighbours++;
    }

    // Check below-right
    if (this.selectedNeighbour(row+1, column+1)) {
      neighbours++;
    }

    // Set new state based on neighbours
    if (neighbours < 2 || neighbours > 3) {
      this.setState({nextState: false})// Dead
    } else if (neighbours === 3) {
      this.setState({nextState: true})
    }
  }

  selectedNeighbour(row, col) {
    let total = Math.sqrt(this.props.selected.length);
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
    return this.props.selected[id].state.alive;
  }

  stepForward() {
    this.calculate();
    let alive = this.state.nextState;
    this.setState({alive});
  }

  onClick(cell) {
    let alive = this.state.alive;
    alive = !alive;
    this.setState({alive});
  }

  render() {
    return (
        <div className={this.state.alive?"cell is-active":"cell"}
               onClick={(cell) => this.onClick(cell)} id={this.props.id}>
        </div>
      );
   }
}

export default Cell;
