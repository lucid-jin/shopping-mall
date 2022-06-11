import React from 'react';
import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import {Cart} from "../../mocks/handlers/cart.handler";
import {GET_CARTS} from "../../graphql/cart";
import Carts from "../../components/cart";


const CartPage = () => {
  const {data} = useQuery<{ carts: { [key: string]: Cart } }>(QueryKeys.CARTS, () => graphqlFetcher(GET_CARTS), {
    cacheTime: 1000,
    staleTime: 0
  })                                            

  const carts = Object.values<Cart>(data?.carts ?? []);
  return <Carts carts={carts}/>
};                                             

export default CartPage