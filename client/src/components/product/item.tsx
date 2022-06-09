import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Product} from "../../graphql/products";
import {useMutation} from "react-query";
import {graphqlFetcher} from "../../queryClient";
import {Cart} from "../../mocks/handlers/cart.handler";
import {ADD_CART} from "../../graphql/cart";

const ProductItem = ({id, description, imageUrl, price, title}: Product) => {
  const {
    data,
    mutate: addCart
  } = useMutation<{ carts: { [key: string]: Cart }  }, unknown, string>((id) => graphqlFetcher(ADD_CART, {id}))

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(data?.carts[id].amount || 0)
  }, [data])

  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">
          {title}
        </p>
        <p className="product-item__description">{description}</p>
        <img className="product-item__image" alt={title} src={imageUrl}></img>
        <span className="product-item__price">{price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>장바구니 담기</button>
      <span className="product-item__cart-count">{count}</span>
    </li>
  );
};

export default ProductItem