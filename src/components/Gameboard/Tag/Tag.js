import React, { Component } from 'react';
import classes from './Tag.module.css';
import capitalize from '../../../helpers/capitalize';

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
    }
  }
  render() {
    const [ratioLeft, ratioTop] = this.props.coordinates;
    const borderColor = this.state.neutralState ? '#000' : '#f00';
    const style = {
      height: '14%',
      width: '5%',
      top: `${ratioTop - 7}%`,
      left: `${ratioLeft - 2.5}%`,
      borderColor: borderColor,
    };

    return this.props.show ? (
      <div className={classes.Tag} style={style}>
        <select value={this.state.value} onChange={(e) => this.handleSelect(e)}>
          <option value="default" disabled>
            character?
          </option>
          {this.props.characters.map((item, i) => {
            return (
              <option key={item + i} value={item.toLowerCase()}>
                {capitalize(item)}
              </option>
            );
          })}
        </select>
      </div>
    ) : null;
  }
}

export default Tag;
