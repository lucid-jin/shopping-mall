import React from 'react';
import {Product} from "../../types/Product.type";


const ProductItem = ({id, description, image, price, rating, title, category}: Product) => {
  return (
    <li className="product-item">
      <p className="product-item__category">
        {category}
      </p>
      <p className="product-item__title">
        {category}
      </p>
      <p className="product-item__description">{description}</p>
      <img className="product-item__image" alt={title} src={image}></img>
      <span className="product-item__price">{price}</span>
      <span className="product-item__rating">{rating.rate}</span>
    </li>
  );
};

export default ProductItem