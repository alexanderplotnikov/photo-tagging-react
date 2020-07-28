import React from 'react';
import Aux from '../aux/aux';
import Toolbar from '../../components/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main>{props.children}</main>
  </Aux>
);

export default layout;
