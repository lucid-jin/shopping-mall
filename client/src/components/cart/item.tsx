import React, {ChangeEvent} from 'react';
import {Cart} from "../../mocks/handlers/cart.handler";
import {useMutation} from "react-query";
import {graphqlFetcher} from "../../queryClient";
import {UPDATE_CART} from "../../graphql/cart";

type Props = {};

const CartItem = ({title, amount, id, imageUrl, price}: Cart) => {
  const { mutate: updateCart, data } = useMutation(({id, amount}: {id: string, amount: number}) => graphqlFetcher(UPDATE_CART, { id, amount}))


  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    updateCart({
      id,
      amount: +e.target.value
    })

  };

  return <li className='cart-item'>
    <img src={imageUrl} alt={title}/>
    <p className='cart-item__price'>{price}</p>
    <p className="cart-item__title">{title}</p>
    <input type="number" className='cart-item__amount' value={amount} onChange={handleAmount}/>
  </li>
};

export default CartItem