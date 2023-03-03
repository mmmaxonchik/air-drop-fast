import React, { createContext } from "react"
import { CheckoutStatuses, Item, Order } from "../types"

interface IOrderCreateContext {
  cart: Item[]
  setCart: React.Dispatch<React.SetStateAction<Item[]>>
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
  checkoutStatus: CheckoutStatuses
  setCheckoutStatus: React.Dispatch<React.SetStateAction<CheckoutStatuses>>
}

export const OrderCreateContext = createContext<IOrderCreateContext>({
  cart: [],
  setCart: () => {},
  order: {
    Name: "",
    Surname: "",
    Email: "",
    PhoneNumber: "",
    Telegram: "",
    DeliveryTypeId: 0,
    Items: [],
    Address: { Address: "" },
  },
  setOrder: () => {},
  checkoutStatus: 0,
  setCheckoutStatus: () => {},
})
