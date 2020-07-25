import React from 'react';
import Aux from '../aux/aux';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main>{props.children}</main>
  </Aux>
);

export default layout;
