import React, {createRef, SyntheticEvent, useEffect, useRef} from 'react';
import CartItem from "./item";
import {Cart} from "../../mocks/handlers/cart.handler";
import {useSetRecoilState} from "recoil";
import {checkedCartState} from "../../recoils/cart";
import WillPay from "./willPay";

type Props = {
  carts: Cart[]
};

const Carts = ({carts}: Props) => {
  const setCheckedCartData = useSetRecoilState(checkedCartState)

  const formRef = useRef<HTMLFormElement>(null);
  const checkBoxRefs = carts.map(() => createRef<HTMLInputElement>())

  const handleFormChanged = (e: SyntheticEvent) => {
    // TODO:: controlled component vs uncontrolled components
    // state 로 하지말고 form 요소로 처리하자
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;

    if (targetInput.classList.contains('select-all')) {
      checkBoxRefs.forEach(checkbox => checkbox.current!.checked = targetInput.checked)
    } else {
      const isAllChecked = checkBoxRefs.filter(c => c.current!.checked).length === carts.length;
      (formRef.current.querySelector('.select-all') as HTMLInputElement).checked = isAllChecked
    }
    handleCartState();
  };
  const handleCartState = () => {
    const checkedItems = checkBoxRefs.reduce<Cart[]>((acc, ref, i) => {
      if (ref.current!.checked) acc.push(carts[i])
      return acc;
    }, []);
    setCheckedCartData(checkedItems);
  }

  useEffect(() => {
    handleCartState();
  }, [carts]);


  return <>
    <form ref={formRef} onChange={handleFormChanged}>
      {!!carts.length &&
				<label htmlFor="select-all">
					<input type="checkbox" className='select-all' name='select-all'/>
					전체 선택
				</label>
      }
      <div className="cart">
        {carts.map((cart, index) => <CartItem ref={checkBoxRefs[index]} key={cart.id} {...cart}  />)}
      </div>
    </form>
    <WillPay/>
  </>
};

export default Carts