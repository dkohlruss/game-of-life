import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
         super(props);

         const cells = [];
         for (let i = 0; i < 100; i++) {
           cells.push(<Cell id={i} key={i} selected={cells} />);
         }

         this.state = {
             cells
         };
     }

  render() {
    return (
      <div className="app">
        {this.state.cells}
      </div>
    );
  }
}

export default App;
