import style from "./delivery.module.scss"
import DeliveryInfo from "./DeliveryInfo"
import Order from "./Order"
import Pay from "./Pay"
import PersonalInfo from "./PersonalInfo"

function DeliveryForm() {
  return (
    <div className={style.deliveryForm}>
      <Order />
      <PersonalInfo />
      <DeliveryInfo />
      <Pay />
    </div>
  )
}

export default DeliveryForm
