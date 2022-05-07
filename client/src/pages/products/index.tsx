import React from 'react';
import {useQuery} from "react-query";
import {graphqlFetcher, QueryKeys} from "../../queryClient";
import ProductItem from "../../components/product";
import GET_PRODUCTS, {Product} from "../../graphql/products";

type Props = {};

const Products = (props: Props) => {
  const {data} = useQuery<{products: Product[]}>(QueryKeys.PRODUCTS, () => graphqlFetcher(GET_PRODUCTS)
  )


  return (
    <div>
      {data?.products?.map(p => <ProductItem key={p.id} {...p}/>)}
    </div>
  );
};

export default Products