import React from 'react';
import {Link} from "react-router-dom";

type Props = {
  
};

const Gnb = (props: Props) => {
  return (
    <div className="gnb">
      <ul>
        <li><Link to="/">홈</Link></li>
        <li><Link to="/products">상품목록</Link></li>
        <li><Link to="/cart">장바구니</Link></li>
      </ul>

    </div>
  );
};

export default Gnb