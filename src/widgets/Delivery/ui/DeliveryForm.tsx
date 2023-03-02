import { useContext } from "react"
//Ui
import FinalForm from "./FinalForm"
//Api
import {
  createOrder,
  getDeliveryTypes,
} from "../../../pages/OrderCreatePage/api"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Type
import { CheckoutStatuses } from "../../../pages/OrderCreatePage/types"
import { useQuery, useMutation } from "react-query"

function DeliveryForm() {
  //API
  const fetchDeliveryTypes = useQuery("deliveryTypes", getDeliveryTypes)
  const postNewOrder = useMutation(createOrder)

  const { checkoutStatus } = useContext(OrderCreateContext)
  return (
    <>
      {checkoutStatus !== CheckoutStatuses.Order ? (
        <FinalForm
          step={checkoutStatus}
          fetchDeliveryTypes={fetchDeliveryTypes}
          postNewOrder={postNewOrder}
        />
      ) : null}
      {postNewOrder.isIdle ? null : (
        <div>
          {postNewOrder.isLoading ? <></> : <h1>{postNewOrder.data}</h1>}
        </div>
      )}
    </>
  )
}

export default DeliveryForm
