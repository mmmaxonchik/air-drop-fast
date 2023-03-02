import { useContext, useEffect } from "react"
import { Card } from "react-bootstrap"
//Ui
import CartCard from "./CartCard"
import AddItem from "./AddItem"
import CartCardFooter from "./CartCardFooter"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Style
import style from "./cart.module.scss"
//Type
import { CheckoutStatuses } from "../../../pages/OrderCreatePage/types"
import { useQuery, useMutation } from "react-query"
import {
  getCategories,
  getFinalPrice,
  getMarketplaces,
  getRates,
} from "../../../pages/OrderCreatePage/api"

function Cart() {
  const { cart, checkoutStatus } = useContext(OrderCreateContext)

  const fetchRates = useQuery("rates", getRates)
  const fetchCategories = useQuery("categories", getCategories)
  const fetchMarketplaces = useQuery("marketplaces", getMarketplaces)
  const fetchFinalPrice = useMutation(getFinalPrice)

  useEffect(() => {
    fetchFinalPrice.mutate(cart)
  }, [cart])
  return (
    <div>
      {checkoutStatus === CheckoutStatuses.Order ? (
        <>
          {fetchRates.isError &&
          fetchCategories.isError &&
          fetchMarketplaces.isError ? (
            <Card className={style.cartError}>
              <Card.Title>Произошла ошибка, попробуйте позже.</Card.Title>
            </Card>
          ) : (
            <>
              <AddItem
                fetchRates={fetchRates}
                fetchCategories={fetchCategories}
                fetchMarketplaces={fetchMarketplaces}
              />
              {cart.length > 0 ? (
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
                  <CartCardFooter fetchFinalPrice={fetchFinalPrice} />
                </Card>
              ) : null}
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default Cart
