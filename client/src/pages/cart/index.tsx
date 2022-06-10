import React from 'react';
import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import CartItem from "../../components/cart/item";
import {Cart} from "../../mocks/handlers/cart.handler";
import {GET_CARTS} from "../../graphql/cart";


const CartPage = () => {
  const {data} = useQuery<{ carts: { [key: string]: Cart } }>(QueryKeys.CARTS, () => graphqlFetcher(GET_CARTS), {
    cacheTime: 1000,
    staleTime: 0
  })
  const carts = Object.values<Cart>(data?.carts ?? []);

  return <div>
    <label htmlFor="allCheck">
      <input type="checkbox" id='allCheck'/>
      전체 체크
    </label>

    <div className="cart">
      {carts.map(cart => <CartItem key={cart.id} {...cart} />)}
    </div>
  </div>;
};

export default CartPage