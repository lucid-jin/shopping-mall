import React from 'react';
import {useRoutes} from "react-router-dom";
import {routes} from './routes'

type Props = {};

const App = (props: Props) => {
  return useRoutes(routes)
};

export default App