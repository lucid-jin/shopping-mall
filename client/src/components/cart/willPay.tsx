import React, {SyntheticEvent, useMemo} from 'react';
import {useNavigate} from 'react-router-dom'
import {useRecoilValue} from "recoil";
import {checkedCartState} from "../../recoils/cart";
import ItemData from "./itemData";

type Props = {

};

const WillPay = (props: Props) => {
  const navigate = useNavigate()

  const cartItemData = useRecoilValue(checkedCartState)

  const cartItems = cartItemData.map((v) => {
    return (
    <li key={v.id}>
      <ItemData key={v.id} {...v}/>
      <p>수량: {v.amount}</p>
      <p>금액: {v.price * v.amount}</p>
    </li>)
  });

  const totalPrice = useMemo(() => {
    return cartItemData.reduce((acc, item) => {
      acc += item.amount * item.price;
      return acc;
    }, 0)
  }, [cartItemData])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (cartItems.length){
      navigate('/payment')
    }
  };

  return (
    <div className='cart-willPay'>
      <ul>
        {cartItems}
      </ul>
      <div>
        <p> 상품 결제 예상액: {totalPrice}</p>
        <button onClick={handleSubmit}>결제하기</button>
      </div>
    </div>

  );
};

export default WillPay