

import { atom } from "recoil";

export const CartState = atom({
    key:"add to cart",
    default: typeof window !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [], // Load cart from localStorage if it exists
})
