import {atom} from "recoil";
import {Cart} from "../mocks/handlers/cart.handler";


export const checkedCartState = atom<Cart[]>({
  key: 'cartState',
  default: []
});
