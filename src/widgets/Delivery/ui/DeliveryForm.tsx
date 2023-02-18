import React, { createContext, useState } from "react"
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

const DeliveryContext = createContext<IDeliveryContext>({
  deliveryState: enumDeliveryState.Order,
  setDeliveryState: () => {},
})

function DeliveryForm() {
  const [deliveryState, setDeliveryState] = useState<enumDeliveryState>(
    enumDeliveryState.Order
  )
  console.log(deliveryState)
  const context = { deliveryState, setDeliveryState }
  return (
    <DeliveryContext.Provider value={context}>
      <Progress />
      <div className={style.deliveryForm}>
        {deliveryState === enumDeliveryState.Order ? <Order /> : null}
        {deliveryState === enumDeliveryState.PersonalInfo ? (
          <PersonalInfo />
        ) : null}
        {deliveryState === enumDeliveryState.DeliveryInfo ? (
          <DeliveryInfo />
        ) : null}
        {deliveryState === enumDeliveryState.Pay ? <Pay /> : null}
      </div>
    </DeliveryContext.Provider>
  )
}

export default DeliveryForm
