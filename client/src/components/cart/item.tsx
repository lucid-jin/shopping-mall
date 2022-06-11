import React, {ChangeEvent, ForwardedRef} from 'react';
import {Cart} from "../../mocks/handlers/cart.handler";
import {useMutation} from "react-query";
import {getClient, graphqlFetcher, QueryKeys} from "../../queryClient";
import {DELETE_CART, UPDATE_CART} from "../../graphql/cart";

type Props = {
  
};

const CartItem = ({title, amount, id, imageUrl, price}: Cart, ref: ForwardedRef<HTMLInputElement> ) => {
  const queryClient = getClient();
  const {mutate: updateCart} = useMutation(({id, amount}) => graphqlFetcher(UPDATE_CART, {
    id,
    amount
  }), {
    onMutate,
    onSuccess
  })
  const {mutate: deleteCart} = useMutation(({id}: { id: string }) => graphqlFetcher(DELETE_CART, {id}))

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
    queryClient.setQueryData(QueryKeys.CARTS, newValue)
  }


  const handleAmount = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    const amount = +value;
    if (amount < 1) return;

    updateCart({id, amount})
  };
  // item 하나에 대한 데이터 처리를 전부다 리액트 쿼리가 가지고 잇는거에서 업데이트를 하니까 반영이되서 좋다
  const handleDeleteItem = () => deleteCart({id}, {
    onSuccess: ({carts}) => {
      queryClient.setQueryData(QueryKeys.CARTS, {    // 리덕스와 같은 느낌임
        carts
      })
    }
  });

  return <li className='cart-item'>
    <label htmlFor={`select-${id}`}  >
      <input type="checkbox" ref={ref} className='cart-item__checkbox' name={`select-${id}`}/>
    </label>
    <img src={imageUrl} className='cart_item__image' alt={title}/>
    <p className='cart-item__price'>{price}</p>
    <p className="cart-item__title">{title}</p>
    <input className='cart-item__amount'
           type="number"
           value={amount} onChange={handleAmount}
    />
    <button className="cart-item__button" onClick={handleDeleteItem}>삭제</button>
  </li>
};

export default React.forwardRef(CartItem)