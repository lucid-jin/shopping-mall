import React from 'react';
import {Link} from "react-router-dom";
import {Product} from "../../graphql/products";


const ProductItem = ({id, description, imageUrl, price,title}: Product) => {
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
    </li>
  );
};

export default ProductItem