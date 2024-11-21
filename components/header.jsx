"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@/Styles/header.css";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { CartState } from "@/app/state/atoms/CartState";

const Header = () => {
  const cartState = useRecoilValue(CartState);
  const [isCartLoading, setIsCartLoading] = useState(true); // Loading state for cart

  useEffect(() => {
    // Simulate fetching cart state from localStorage or server
    if (cartState !== undefined) {
      setIsCartLoading(false); // Set loading to false once data is ready
    }
  }, [cartState]);

  const [nav, setNav] = useState(false);

  function out() {
    setTimeout(() => {
      setNav(false);
    }, 150);
  }

  const cartItemCount = isCartLoading
    ? "" // Show nothing while loading
    : cartState.length === 0
    ? 0 // Show 0 if cart is empty
    : cartState.length; // Show actual cart count

  return (
    <>
      <div className="header">
        <h1 className="title">
          <Link href="/" className="link_dec link" onClick={out}>
            ARYA.
          </Link>
        </h1>
        <div className="nav">
          <Link href="/" className="link nav-tile">
            Home
          </Link>
          <Link href="/Menu" className="link nav-tile">
            Menu
          </Link>
          <Link href="/About" className="link nav-tile">
            About
          </Link>
        </div>
        <div
          className="menu-icon"
          onClick={() => {
            setNav(!nav);
          }}
        >
          <Image src="/icons/menu.png" height={40} width={40} alt="menu icon" />
        </div>
        <div className="cartimg">
          <Link href="/Addtocart" className="cartlink">
            <span className="cartitemnum">{cartItemCount}</span>
            <Image
              src="/icons/cart.svg"
              height={40}
              width={40}
              alt="cart icon"
            />
          </Link>
        </div>
      </div>
      {nav ? (
        <div className="menu-mob">
          <Link href="/" className="link menu-tile" onClick={out}>
            Home
          </Link>
          <Link href="/Menu" className="link menu-tile" onClick={out}>
            Menu
          </Link>
          <Link href="/About" className="link menu-tile" onClick={out}>
            About
          </Link>
        </div>
      ) : (
        <div
          className="menu-mob"
          style={{
            transform: "translateX(110%)",
            opacity: "0",
            display: "none",
          }}
        >
          <Link href="/" className="link menu-tile" onClick={out}>
            Home
          </Link>
          <Link href="/Menu" className="link menu-tile" onClick={out}>
            Menu
          </Link>
          <Link href="/About" className="link menu-tile" onClick={out}>
            About
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
