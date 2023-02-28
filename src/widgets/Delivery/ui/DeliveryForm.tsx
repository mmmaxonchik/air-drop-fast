import { useState, useContext, useEffect } from "react"
import { Card } from "react-bootstrap"
//Ui
import FinalForm from "./FinalForm"
//Api
import { getDeliveryTypes } from "../api"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Type
import {
  CheckoutStatuses,
  Marketplace,
} from "../../../pages/OrderCreatePage/types"

function DeliveryForm() {
  //API
  const [deliveryTypes, setDeliveryTypes] = useState<Marketplace[]>([])
  const getAllDeliveryTypes = async () => {
    const types = await getDeliveryTypes()
    setDeliveryTypes(types)
  }

  useEffect(() => {
    getAllDeliveryTypes()
  }, [])

  const { checkoutStatus } = useContext(OrderCreateContext)
  return (
    <>
      {checkoutStatus !== CheckoutStatuses.Order ? (
        <FinalForm step={checkoutStatus} deliveryTypes={deliveryTypes} />
      ) : null}
    </>
  )
}

export default DeliveryForm
