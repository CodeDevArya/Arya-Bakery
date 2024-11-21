"use client";
import React, { useEffect, useState } from "react";
import "@/Styles/cart.css";
import Cart from "@/components/Cart";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CartState } from "../state/atoms/CartState";
import Link from "next/link";

const CartPage = () => {
  const cartval = useRecoilValue(CartState);
  const setCart = useSetRecoilState(CartState);
  const [loading, setLoading] = useState(true); // Loading state
  const [total, setTotal] = useState(0);

  // Load cart from local storage and initialize
  useEffect(() => {
    setLoading(true); // Set loading to true
    setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false); // Set loading to false after data is loaded
    }, 1000); // Simulated delay (can be removed in real use cases)
  }, [setCart]);

  // Calculate total price
  useEffect(() => {
    let totalAmount = 0;
    cartval.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotal(totalAmount);
  }, [cartval]);

  const textWp = (item) => [item.title, " x ", item.quantity].join("");

  const Main = () => {
    return (
      <>
        {cartval.map((val) => {
          return <Cart dta={val} key={val.key} />;
        })}
        <hr />
        <div className="total">Total: ₹{total}</div>
        <Link
          href={`https://api.whatsapp.com/send?phone=987XXXXXXX&text=Hello%20i%20want%20to%20buy%20${cartval.map(
            textWp
          )}%20,All%20total%20price%20is%20₹${total}`}
          target="blank"
        >
          <button className="cartbuy">Buy now</button>
        </Link>
      </>
    );
  };

  return (
    <>
      <div className="maincart">
        {loading ? (
          <div className="loading-spinner">
            <span>Loading...</span>
          </div>
        ) : cartval.length === 0 ? (
          <>
            <p className="addanim">Add something to the cart</p>
            <div className="noth">Nothing is available here</div>
          </>
        ) : (
          <Main />
        )}
      </div>
    </>
  );
};

export default CartPage;
