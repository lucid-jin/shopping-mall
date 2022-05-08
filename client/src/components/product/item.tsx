import React from 'react';
import {Link} from "react-router-dom";
import {Product} from "../../graphql/products";
import {cartItemSelector} from "../../recoils/cart";
import {useRecoilState} from "recoil";


const ProductItem = ({id, description, imageUrl, price,title}: Product) => {
  const [cartItem, setCartAmount] = useRecoilState(cartItemSelector(id));

  const addToCart = () => setCartAmount(prev => (prev || 0) + 1);

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
      <button className="product-item__add-cart" onClick={addToCart}>장바구니 담기</button>
        <span className="product-item__cart-count">{cartItem || 0}</span>
    </li>
  );
};

export default ProductItem