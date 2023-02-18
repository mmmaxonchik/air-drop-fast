import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { IOrder } from "../../Delivery/ui/Order"
import CardForCart from "./CardForCart"
import style from "./cart.module.scss"

function Cart() {
  const [cartItems, setCartItems] = useState<IOrder[]>([])

  useEffect(() => {
    const cookie: string | undefined = getCookie("Order")
    if (typeof cookie === "string") {
      setCartItems(JSON.parse(cookie))
    }
  }, [])
  return (
    <div>
      <Card className={style.cardForCart}>
        <Card.Title>Корзина</Card.Title>
        {cartItems.map((props, index) => (
          <CardForCart {...props} key={index} />
        ))}
      </Card>
    </div>
  )
}

export default Cart
