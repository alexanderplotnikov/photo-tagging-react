import React, { useState } from 'react';
import classes from './Tag.module.css';
const Tag = (props) => {
  const [selectValue, setValue] = useState('default');
  const [ratioTop, ratioLeft] = props.coordinates;
  const style = {
    height: '14%',
    width: '5%',
    top: `${ratioLeft - 7}%`,
    left: `${ratioTop - 2.5}%`,
  };
  const handleSelect = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={classes.Tag} style={style}>
      <select value={selectValue} onChange={(e) => handleSelect(e)}>
        <option value="default" disabled>
          character?
        </option>
        {props.characters.map((item, i) => {
          return (
            <option key={item + i} value={item.toLowerCase()}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Tag;
