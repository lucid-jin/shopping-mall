import React, {ChangeEvent} from 'react';
import {Cart} from "../../mocks/handlers/cart.handler";
import {useMutation} from "react-query";
import {getClient, graphqlFetcher, QueryKeys} from "../../queryClient";
import {UPDATE_CART} from "../../graphql/cart";

type Props = {};

const CartItem = ({title, amount, id, imageUrl, price}: Cart) => {
  const queryClient = getClient();
  const {mutate: updateCart, isSuccess} = useMutation(({
                                                         id,
                                                         amount
                                                       }: { id: string, amount: number }) => graphqlFetcher(UPDATE_CART, {
    id,
    amount
  }), {
    onMutate,
    onSuccess
  })

  // 낙관적 업데이트
  async function onMutate({id, amount}: { id: string, amount: number }) {
    await queryClient.cancelQueries(QueryKeys.CARTS);

    const cart = queryClient.getQueryData<{ carts: { [key: string]: Cart } }>(QueryKeys.CARTS)
    const originCart = cart?.carts;

    // else 조건을 체크해야되구나
    if (!originCart?.[id]) return originCart;

    const newValue = {
      ...(originCart || {}),
      [id]: {
        ...originCart[id],
        amount
      }
    }
    queryClient.setQueryData(QueryKeys.CARTS, {
      carts: {
        ...newValue
      }
    })

    return originCart;
  }

  function onSuccess(newValue: any) {
    console.log('onSucess')
    queryClient.setQueryData(QueryKeys.CARTS, newValue)
  }


  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    // step:1
    // updateCart({
    //   id,
    //   amount: +e.target.value
    // }, {
    //   onSuccess: () => queryClient.invalidateQueries(QueryKeys.CARTS).catch()
    // })
    // 비동기이기 때문에 리패치를 제어 한다.
    // 자주 요청하는게 좋은걸까 ?

    // 방법 2: 바로 쿼리클라이언트의 값을 변경 해줄수 잇다
    // updateCart({id, amount: +e.target.value}, {
    //     onSuccess: (newValue) => {
    //       queryClient.setQueryData(QueryKeys.CARTS, newValue
    //       )
    //     }
    //     // queryClient.setQueryData(QueryKeys.CARTS)}
    //   }
    //)

    updateCart({
      id,
      amount: +e.target.value
    })
  };

  return <li className='cart-item'>
    <img src={imageUrl} className='cart_item__image' alt={title}/>
    <p className='cart-item__price'>{price}</p>
    <p className="cart-item__title">{title}</p>
    <input type="number" className='cart-item__amount' value={amount} onChange={handleAmount}/>
  </li>
};

export default CartItem