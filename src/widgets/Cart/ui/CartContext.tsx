import { createContext, Dispatch, SetStateAction } from "react"
import { IOrder } from "../../Delivery/lib/orderType"

interface ICartContext {
  cart: IOrder[]
  setCart: Dispatch<SetStateAction<IOrder[]>>
}

export const CartContext = createContext<ICartContext>({
  cart: [],
  setCart: () => {},
})
