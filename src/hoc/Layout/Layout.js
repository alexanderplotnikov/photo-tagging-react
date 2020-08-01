import React from 'react';
import Aux from '../aux/aux';
import Toolbar from '../../components/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main style={{ height: '100vh', backgroundColor: 'rgb(0, 104, 104)' }}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
