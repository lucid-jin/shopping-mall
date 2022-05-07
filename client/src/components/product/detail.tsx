import React from 'react';
import {Product} from "../../graphql/products";

type Props = {};

const ProductDetail = ({title, description, createdAt, imageUrl, price}: Product) => {
  return (
    <div className="product-detail">
      <p className="product-item__title">
        {title}
      </p>
      <p className="product-item__description">{description}</p>
      <img className="product-item__image" alt={title} src={imageUrl}></img>
      <span className="product-item__price">{price}</span>
    </div>
  );
};

export default ProductDetail