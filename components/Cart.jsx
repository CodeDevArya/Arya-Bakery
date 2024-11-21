"use client";
import { CartState } from "@/app/state/atoms/CartState";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const cart = (props) => {
  const [carval, setCarval] = useRecoilState(CartState);

  // Update localStorage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carval));
  }, [carval]);

  function addCount() {
    setCarval((prevData) =>
      prevData.map((item) =>
        item.key === props.dta.key && item.quantity < 20
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function subCount() {
    setCarval((prevData) =>
      prevData.map((item) =>
        item.key === props.dta.key && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function remove(id) {
    const updatedCart = carval.filter((item) => item.key !== id);
    setCarval(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Manually sync with localStorage
  }

  return (
    <>
      <div className="cartitem" id={props.dta.key}>
        <span className="flexqny">
          <Image
            src={props.dta.img}
            width={500}
            height={500}
            className="cartimg-2"
            alt="Image of the product"
          />
          <span className="cartinfo">
            <span className="carttitle">{props.dta.title}</span>
            <span className="cartdesc">{props.dta.desc}</span>
          </span>
        </span>
        <span className="flexqny">
          <div className="quantity">
            {/* Quantity Controls */}
            <span className="qntybtn">
              <button onClick={subCount}>-</button>
              {props.dta.quantity}
              <button onClick={addCount}>+</button>
            </span>
          </div>
          <div className="price">
            <span className="pri">₹ {props.dta.price}</span>
            <button onClick={() => remove(props.dta.key)} className="pricebtn">
              <Image
                src="/icons/recyclebin.png"
                width={20}
                height={20}
                className="pri-img"
                alt="image of the remove icon"
              />
            </button>
          </div>
        </span>
      </div>
    </>
  );
};

export default cart;
