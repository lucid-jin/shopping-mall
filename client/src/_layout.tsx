import React, {Suspense} from 'react';
import {Outlet} from "react-router-dom";
import Gnb from "./components/layouts/gnb";

type Props = {};

const Layout: React.FC = (props: Props) => {
  return (
    <Suspense fallback={'...loading'}>
      <Gnb/>
      <Outlet/>
    </Suspense>
  );
};

export default Layout