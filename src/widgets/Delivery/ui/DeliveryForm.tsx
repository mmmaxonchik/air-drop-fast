import React, { createContext, useState } from "react"
import { Card } from "react-bootstrap"
import AddItem from "./AddItem"
import style from "./delivery.module.scss"
import FinalForm from "./FinalForm"
import Progress from "./Progress"

export enum enumDeliveryState {
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
        {deliveryState === enumDeliveryState.Order ? <AddItem /> : null}
        {deliveryState !== enumDeliveryState.Order ? (
          <FinalForm step={deliveryState} />
        ) : null}
      </Card>
    </DeliveryContext.Provider>
  )
}

export default DeliveryForm
