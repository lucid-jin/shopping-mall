import React, {Suspense} from 'react';
import {Outlet} from "react-router-dom";

type Props = {};

const Layout: React.FC = (props: Props) => {
  return (
    <Suspense fallback={'...loading'}>
      <Outlet/>
    </Suspense>
  );
};

export default Layout