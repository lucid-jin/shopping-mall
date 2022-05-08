import productsHandler from "./products.handler";
import cartHandler from './cart.handler'

export default [
  ...productsHandler,
  ...cartHandler
]