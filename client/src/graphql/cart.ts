import {gql} from "graphql-tag";


export const ADD_CART = gql`
    mutation ADD_CART($id: string) {
        cart
    }
`

export const GET_CARTS = gql`
    query GET_CARTS {
        id
        imageUrl
        price
        title
        description
        createdAt
        amount
    }
`

export const UPDATE_CART = gql`
    mutation UPDATE_CART($id: string) {
        cart(id: $id){
            id
            imageUrl
            price
            title
            amount
        }
    }
`