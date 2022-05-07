import React from 'react';
import {useRoutes} from "react-router-dom";
import {routes} from './routes'
import {getClient} from "./queryClient";
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

type Props = {};

const App = (props: Props) => {
  const elem = useRoutes(routes)
  const queryClient = getClient()

  return (
    <QueryClientProvider client={queryClient}>
      {elem}
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
};

export default App