import React from 'react';
import {Cart} from "../../mocks/handlers/cart.handler";

type Props = Pick<Cart, 'imageUrl' | 'title' | 'price'>

const ItemData = ({ title, price, imageUrl}: Props) => {
  return (
    <div>
      <img src={imageUrl} className='cart_item__image' alt={title}/>
      <p className='cart-item__price'>{price}</p>
      <p className="cart-item__title">{title}</p>
    </div>
  );
};

export default ItemData