import React, { Component } from 'react';
import Gameboard from '../../components/Gameboard/Gameboard';
import Aux from '../../hoc/aux/aux';
class Waldo extends Component {
  state = {
    tag: {
      coordinates: [null, null],
    },
    characters: ['Waldo', 'Peter'],
  };
  handleTag = (e) => {
    let bounds = e.target.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    let ratioX = Math.round((x / e.target.offsetWidth) * 100);
    let ratioY = Math.round((y / e.target.offsetHeight) * 100);
    this.setState({
      tag: { coordinates: [ratioX, ratioY] },
    });
  };
  render() {
    return (
      <Aux>
        <Gameboard
          clicked={this.handleTag}
          coordinates={this.state.tag.coordinates}
          characters={this.state.characters}
        />
      </Aux>
    );
  }
}

export default Waldo;
