import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
         super(props);

         this.state = {
           alive: false,
           nextState: false
         };

         this.props.selected[this.props.id] = this;
  }

  calculate() {
    let neighbours = 0;
    let total = Math.sqrt(this.props.selected.length);
    let row = Math.floor(this.props.id / total);
    let column = this.props.id - row * total;
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
  //TODO: Add in calculate next state, onclick to change state,
  render() {
    return (
      <div className="cell">
        {this.props.selected[this.props.id].key}
        {this.state.alive.toString()}
      </div>
    );
  }
}

export default Cell;
