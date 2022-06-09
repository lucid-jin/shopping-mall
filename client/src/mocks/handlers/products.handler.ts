import {graphql} from "msw";
import {GET_PRODUCT, GET_PRODUCTS, Product} from "../../graphql/products";

export const mockProducts: Product[] = (() => Array.from({length: 20}).map((_, idx) => ({
  title: '임시 제목' + idx,
  id: (idx + 1).toString(),
  createdAt: new Date(123456790123 + (idx * 1000 * 60 * 60 * 2)).toString(),
  description: 'desc',
  price: 5000,
  imageUrl: `https://placeimg.com/640/480/${idx + 1}`
})))()

const productHandlers = [
  graphql.query(GET_PRODUCTS, (req, res, context) => {
    return res(
      context.data({
        products: mockProducts
      })
    )
  }),


  graphql.query(GET_PRODUCT, (req, res, context) => {
    return res(
      context.data({
        product: mockProducts[0]
      })
    )
  })
]

export default productHandlers;