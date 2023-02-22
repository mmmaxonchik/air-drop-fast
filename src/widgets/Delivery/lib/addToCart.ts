import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { IOrder } from "./orderType"

export function addToCart(value: IOrder) {
  const prevCookie: string | undefined = getCookie("Order")
  if (prevCookie === undefined) {
    setCookie("Order", JSON.stringify([value]))
  } else {
    const prevValue: IOrder[] = JSON.parse(prevCookie)
    const newValue = [...prevValue, value]
    setCookie("Order", JSON.stringify(newValue))
  }
}
