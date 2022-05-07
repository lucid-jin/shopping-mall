import {graphql} from 'msw'
import GET_PRODUCTS, {GET_PRODUCT, Product} from "../graphql/products";
import {v4 as uuid} from 'uuid'

console.log('here')

const mock_products: Product[] = Array.from({length: 20}).map((_, idx) => ({
  title: 'a',
  id: uuid(),
  createdAt: new Date(123456790123 + (idx * 1000 * 60 * 60 * 2)).toString(),
  description: 'desc',
  price: 5000,
  imageUrl: `https://placeimg.com/640/480/${idx + 1}`
}))

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, context) => {
    return res(
      context.data({
        products: mock_products
      })
    )
  }),


  graphql.query(GET_PRODUCT, (req, res, context) => {
    console.log('here', GET_PRODUCT)
    return res(
      context.data({

        product: mock_products[0]
      })
    )
  })
]