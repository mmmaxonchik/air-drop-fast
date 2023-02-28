import { useContext } from "react"
import { Card } from "react-bootstrap"
//Ui
import CartCard from "./CartCard"
import AddItem from "./AddItem"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Style
import style from "./cart.module.scss"
//Type
import { CheckoutStatuses } from "../../../pages/OrderCreatePage/types"

function Cart() {
  const { cart, checkoutStatus } = useContext(OrderCreateContext)

  return (
    <div>
      {checkoutStatus === CheckoutStatuses.Order ? (
        <>
          <AddItem />
          <Card className={style.cardForCart}>
            <Card.Title>Корзина</Card.Title>
            {cart.map((props, index) => (
              <CartCard {...props} key={index} />
            ))}
          </Card>
        </>
      ) : null}
    </div>
  )
}

export default Cart
