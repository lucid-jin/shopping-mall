import React from 'react';
import Layout from "./_layout";

const DynamicIndex = React.lazy(() => import('./pages/index'));
const DynamicProductsIndex = React.lazy(() => import('./pages/products/index'));
// @ts-ignore
const DynamicProductsId = React.lazy(() => import('./pages/products/[id]'));
const DynamicProductsCartIndex = React.lazy(() => import('./pages/products/cart/index'));


export const routes = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      { path: '/', element: <DynamicIndex />, index: true},
      { path: '/products', element: <DynamicProductsIndex />, index: true},
      { path: '/products/:id', element: <DynamicProductsId />, },
      { path: '/products/cart', element: <DynamicProductsCartIndex />, index: true},
    ]
  }
]

export const pages = [
  { route: '/' },
  { route: '/products' },
  { route: '/products/:id' },
  { route: '/products/cart' },
]
