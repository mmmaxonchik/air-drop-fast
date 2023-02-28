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
import { useQuery } from "react-query"
import {
  getCategories,
  getMarketplaces,
  getRates,
} from "../../../pages/OrderCreatePage/api"

function Cart() {
  const { cart, checkoutStatus } = useContext(OrderCreateContext)

  const fetchRates = useQuery("rates", getRates)
  const fetchCategories = useQuery("categories", getCategories)
  const fetchMarketplaces = useQuery("marketplaces", getMarketplaces)
  return (
    <div>
      {checkoutStatus === CheckoutStatuses.Order ? (
        <>
          <AddItem
            fetchRates={fetchRates}
            fetchCategories={fetchCategories}
            fetchMarketplaces={fetchMarketplaces}
          />
          <Card className={style.cardForCart}>
            <Card.Title>Корзина</Card.Title>
            {cart.map((props, index) => (
              <CartCard
                fetchRates={fetchRates}
                fetchCategories={fetchCategories}
                fetchMarketplaces={fetchMarketplaces}
                {...props}
                key={index}
              />
            ))}
          </Card>
        </>
      ) : null}
    </div>
  )
}

export default Cart
