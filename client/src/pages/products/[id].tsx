import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {Product} from "../../types/Product.type";
import {fetcher, QueryKeys} from "../../queryClient";

const ProductDetail = () => {
  const {id} = useParams()
  const {data, isError, isLoading} = useQuery<Product>([QueryKeys.PRODUCTS, id], () => fetcher({
    path: `/products/${id}`,
    method: 'GET'
  }))
  if (isLoading || isError || !data){
    return '...loading'
  }
  const { description, image, price, rating, title, category} = data

  return (
    <div className="product-detail">
      <p className="product-item__category">
        {category}
      </p>
      <p className="product-item__title">
        {title}
      </p>
      <p className="product-item__description">{description}</p>
      <img className="product-item__image" alt={title} src={image}></img>
      <span className="product-item__price">{price}</span>
      <span className="product-item__rating">{rating.rate}</span>

    </div>
  );
};

export default ProductDetail