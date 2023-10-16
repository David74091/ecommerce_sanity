import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

import { useStateContext } from "../../context/StateContext";
import { runFireworks } from "../../lib/utils";

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>感謝您的下單</h2>
        <p className="email-msg">收據已寄送至您的信箱</p>
        <p className="description">
          如果有任何問題請通過信箱聯絡
          <a className="email" href="mailto:test@gmail.com">
            test@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn" width="300px">
            繼續購物
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
