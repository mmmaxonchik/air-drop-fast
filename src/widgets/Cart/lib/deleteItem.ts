import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { IOrder } from "../../Delivery/lib/orderType"

export const deleteItem = (id: number | undefined) => {
  const cookie = getCookie("Order")
  if (typeof cookie === "string") {
    const itemsArray: IOrder[] = JSON.parse(cookie)
    for (let i = 0; i < itemsArray.length; i++) {
      if (id === itemsArray[i].id) {
        itemsArray.splice(i, 1)
      }
    }
    setCookie("Order", JSON.stringify(itemsArray))
  }
}
