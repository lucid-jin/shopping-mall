import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './scss/main.scss'
import {BrowserRouter} from "react-router-dom";
import {worker} from './mocks/browser'
import {RecoilRoot} from "recoil";

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass",
  }).catch(e => console.log(e, 'worker start error'))
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)
