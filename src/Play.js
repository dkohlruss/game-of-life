import React, { Component } from 'react';

class Play extends Component {
  constructor(props) {
         super(props);

         let status = 'Stop!';

         this.state = {
           status
         };

  }

  onClick(button) {
    if (this.state.status === 'Play!') {
      this.setState({status: 'Stop!'});

      this.props.onActivate(button);
    } else {
      this.setState({status: 'Play!'});

      this.props.onActivate(button, this.state.status);
    }
  }

  render() {
    return (
      <button className="play" onClick={(button) => this.onClick(button)}>{this.state.status}</button>
    )
  }
}


export default Play;
