import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { Item } from "../../../pages/OrderCreatePage/types"

export function addItem(value: Item) {
  const prevCookie: string | undefined = getCookie("Order")
  if (prevCookie === undefined) {
    setCookie("Order", JSON.stringify([value]))
  } else {
    const prevValue: Item[] = JSON.parse(prevCookie)
    const newValue = [...prevValue, value]
    setCookie("Order", JSON.stringify(newValue))
  }
}
