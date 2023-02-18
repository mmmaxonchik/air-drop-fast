import React, { createContext, useState } from "react"
import { Card } from "react-bootstrap"
import style from "./delivery.module.scss"
import DeliveryInfo from "./DeliveryInfo"
import Order from "./Order"
import Pay from "./Pay"
import PersonalInfo from "./PersonalInfo"
import Progress from "./Progress"

enum enumDeliveryState {
  Order,
  PersonalInfo,
  DeliveryInfo,
  Pay,
}

interface IDeliveryContext {
  deliveryState: enumDeliveryState
  setDeliveryState: React.Dispatch<React.SetStateAction<enumDeliveryState>>
}

export const DeliveryContext = createContext<IDeliveryContext>({
  deliveryState: enumDeliveryState.Order,
  setDeliveryState: () => {},
})

function DeliveryForm() {
  const [deliveryState, setDeliveryState] = useState<enumDeliveryState>(
    enumDeliveryState.Order
  )
  const context = { deliveryState, setDeliveryState }
  return (
    <DeliveryContext.Provider value={context}>
      <Card className={style.deliveryForm}>
        <Progress />
        {deliveryState === enumDeliveryState.Order ? <Order /> : null}
        {deliveryState === enumDeliveryState.PersonalInfo ? (
          <PersonalInfo />
        ) : null}
        {deliveryState === enumDeliveryState.DeliveryInfo ? (
          <DeliveryInfo />
        ) : null}
        {deliveryState === enumDeliveryState.Pay ? <Pay /> : null}
      </Card>
    </DeliveryContext.Provider>
  )
}

export default DeliveryForm
