import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
         super(props);

         let alive = this.props.active;

         this.state = {
           alive
         };
  }

  onClick(cell) {
    let alive = this.props.active;
    alive?cell.target.className = "cell" : cell.target.className = "cell is-active";
    alive = !alive;

    this.setState({alive});

    this.props.onClick(cell, alive);
  }

  render() {
    return (
        <div className={this.props.active?"cell is-active":"cell"}
                id={this.props.id} onClick={(cell) => this.onClick(cell)}>
        </div>
      );
   }
}

export default Cell;

// onClick={(cell) => this.props.onClick(cell)}
