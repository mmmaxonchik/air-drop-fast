import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
//Cookie
import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
//UI
import { Cart } from "../../../widgets/Cart"
import { DeliveryForm } from "../../../widgets/Delivery"

import Progress from "../../../widgets/Delivery/ui/Progress"
//Types
import type { Item, Order } from "../types"
//Lib
import { OrderCreateContext } from "../lib/orderCreate.context"
//React-Query
import { QueryClient, QueryClientProvider } from "react-query"
//Style
import style from "./deliveryPage.module.scss"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function DeliveryPage() {
  //Context
  const [cart, setCart] = useState<Item[]>([])
  const [order, setOrder] = useState<Order>({
    Name: "",
    Surname: "",
    Email: "",
    PhoneNumber: "",
    Telegram: "",
    DeliveryTypeId: 0,
    Items: [],
    Address: { Region: "" },
  })
  const [checkoutStatus, setCheckoutStatus] = useState<number>(0)

  useEffect(() => {
    const cookie: string | undefined = getCookie("Order")
    if (typeof cookie === "string") {
      Array.isArray(JSON.parse(cookie))
        ? setCart(JSON.parse(cookie))
        : setCookie("Order", JSON.stringify([]))
    }
  }, [])

  const deliveryContext = {
    cart,
    setCart,
    order,
    setOrder,
    checkoutStatus,
    setCheckoutStatus,
  }
  return (
    <QueryClientProvider client={queryClient}>
      <OrderCreateContext.Provider value={deliveryContext}>
        <div className={style.page}>
          <Card style={{ padding: 10 }}>
            <Progress />
            <DeliveryForm />
            <Cart />
          </Card>
        </div>
      </OrderCreateContext.Provider>
    </QueryClientProvider>
  )
}

export default DeliveryPage
