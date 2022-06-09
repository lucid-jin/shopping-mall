import {graphql} from "msw";
import {mockProducts} from "./products.handler";
import {Product} from "../../graphql/products";
import {ADD_CART, GET_CARTS, UPDATE_CART} from "../../graphql/cart";


export type Cart = Product & { amount: number }

// @ts-ignore
let carts: { [key: string]: Cart }  = (() => {})();

const cartHandler = [
  graphql.query(GET_CARTS, (req, res, ctx) => {
    console.log(carts)


    return res(
      ctx.data(
        {
          carts
        }
      )
    )
  }),
  graphql.mutation(ADD_CART, (req, res, context) => {
    const id = req.variables.id;

    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      return res(
        context.status(404),
        context.data({
          message: 'not found product item'
        }))
    }

    if (carts && carts.hasOwnProperty(id)) {
      carts[id] = {
        ...carts[id],
        amount: carts[id].amount + 1
      }
    } else {
      carts = {
        ...carts,
        [id]: {...product, amount: 1}
      }
    }

    return res(
      context.status(200),
      context.data({
        carts: carts
      })
    )
  }),
  graphql.mutation(UPDATE_CART, (req,res, context) => {
    carts[req.variables.id].amount = req.variables.amount;

    return res(
      context.status(200),
      context.data({
        carts: carts
      })
    )

  })
]

export default cartHandler;