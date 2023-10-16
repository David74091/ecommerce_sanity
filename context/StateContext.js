import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  //新增商品進購物車
  const onAdd = (product, quantity) => {
    //如果購物車裡已經有該商品，返回那件商品
    //const found = array1.find((element) => element > 10);
    //console.log(found);
    // Expected output: 12
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    //如果購物車內已經有一樣的產品，那麼返回一樣的購物車產品列表，但是該產品數量+1
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} 新增至購物車`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantites) => prevTotalQuantites - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  //購物車內增加或減少商品數量
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    //這裡指把選中的那個產品刪除
    //不要直接改變cartItems state 。const newCartItems = cartItems.splice(index, 1); splice（開始的起點,從起點開始要刪除的數量,替換的元件)
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      //   cartItems[index] = foundProduct; 永遠不要直接改變state，一定要用setState
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantites) => prevTotalQuantites + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        //   cartItems[index] = foundProduct; 永遠不要直接改變state，一定要用setState
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantites) => prevTotalQuantites - 1);
      }
    }
  };

  //增加購買數量
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //減少購買數量
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty <= 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

//這裡相當於在目標頁面使用useContext(StateContext)，在這裡自訂hook可以省下這個步驟
export const useStateContext = () => useContext(Context);
