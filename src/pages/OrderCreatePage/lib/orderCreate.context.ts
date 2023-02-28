import React, { createContext } from "react"
import { Item, Order } from "../types"

export enum enumDeliveryState {
  Order,
  PersonalInfo,
  DeliveryInfo,
}

interface IOrderCreateContext {
  cart: Item[]
  setCart: React.Dispatch<React.SetStateAction<Item[]>>
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
  checkoutStatus: number
  setCheckoutStatus: React.Dispatch<React.SetStateAction<number>>
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
