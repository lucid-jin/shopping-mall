import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import {GET_PRODUCT, Product} from "../../graphql/products";
import ProductDetail from "../../components/product/detail";

const ProductDetailPage = () => {
  const {id} = useParams()
  const {data, isError, isLoading} = useQuery<{ product: Product }>([QueryKeys.PRODUCTS, id], () => graphqlFetcher(GET_PRODUCT, {id}));

  if (isLoading || isError || !data){
    return '...loading'
  }
  return (
    <>
      <div>상품 상세 화면 </div>
      <ProductDetail {...data?.product}/>
    </>
  );
};

export default ProductDetailPage