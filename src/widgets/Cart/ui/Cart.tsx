import { useContext, useEffect } from "react"
import { Card } from "react-bootstrap"
import CardForCart from "./CardForCart"
import style from "./cart.module.scss"
import { CartContext } from "./CartContext"

function Cart() {
  const { cart } = useContext(CartContext)

  return (
    <div>
      <Card className={style.cardForCart}>
        <Card.Title>Корзина</Card.Title>
        {cart.map((props, index) => (
          <CardForCart {...props} key={index} />
        ))}
      </Card>
    </div>
  )
}

export default Cart
