import { useState, useEffect } from "react"
import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { Cart, CartContext } from "../../../widgets/Cart"
import { DeliveryForm } from "../../../widgets/Delivery"
import { IOrder } from "../../../widgets/Delivery/lib/orderType"
import style from "./deliveryPage.module.scss"

function DeliveryPage() {
  const [cart, setCart] = useState<IOrder[]>([])

  useEffect(() => {
    const cookie: string | undefined = getCookie("Order")
    if (typeof cookie === "string") {
      Array.isArray(JSON.parse(cookie))
        ? setCart(JSON.parse(cookie))
        : setCookie("Order", JSON.stringify([]))
    }
  }, [])

  const context = { cart, setCart }
  return (
    <div className={style.page}>
      <CartContext.Provider value={context}>
        <DeliveryForm />
        <Cart />
      </CartContext.Provider>
    </div>
  )
}

export default DeliveryPage
