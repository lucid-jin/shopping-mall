import React from 'react';
import {useQuery} from "react-query";
import {fetcher, QueryKeys} from "../../queryClient";
import {Product} from "../../types/Product.type";
import ProductItem from "../../components/product";

type Props = {};

const Products = (props: Props) => {
  const {data} = useQuery<Product[]>(QueryKeys.PRODUCTS, () => fetcher({
      method: 'GET',
      path: '/products'
    })
  )


  return (
    <div>
      {data?.map(p => <ProductItem key={p.id} {...p}/>)}
    </div>
  );
};

export default Products