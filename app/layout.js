"use client"
import "./globals.css";
import Header from "@/components/header";
// import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { useEffect } from "react";
import { CartState } from "./state/atoms/CartState";




export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <title>Arya's Bakery</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <body>
        <RecoilRoot>

          <Header />
          {children}          
        </RecoilRoot>
      </body>
    </html>
  );
}
