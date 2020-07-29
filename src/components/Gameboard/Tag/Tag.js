import React, { Component } from 'react';
import classes from './Tag.module.css';

class Tag extends Component {
  state = {
    value: 'default',
    neutralState: true,
  };
  handleSelect = (e) => {
    const response = this.props.verify(e.target.value);
    this.setState({ neutralState: response });
  };
  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) {
      this.setState({ neutralState: true });
      console.log('[Tag.js] componentDidUpdate');
    }
  }
  render() {
    const [ratioTop, ratioLeft] = this.props.coordinates;
    const borderColor = this.state.neutralState ? '#000' : '#f00';
    const style = {
      height: '14%',
      width: '5%',
      top: `${ratioLeft - 7}%`,
      left: `${ratioTop - 2.5}%`,
      borderColor: borderColor,
    };

    return (
      <div className={classes.Tag} style={style}>
        <select value={this.state.value} onChange={(e) => this.handleSelect(e)}>
          <option value="default" disabled>
            character?
          </option>
          {this.props.characters.map((item, i) => {
            return (
              <option key={item + i} value={item.toLowerCase()}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Tag;
