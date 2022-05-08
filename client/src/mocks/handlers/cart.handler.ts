import {graphql} from "msw";

const cartHandler = [
  graphql.query('a', (req, res, context) => {
    res(
      context.data({
        cart: [
          
        ]
      })
    )
  })
]

export default cartHandler;