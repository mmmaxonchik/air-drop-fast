import { Cart } from "../../../widgets/Cart"
import { DeliveryForm } from "../../../widgets/Delivery"
import style from "./deliveryPage.module.scss"

function DeliveryPage() {
  return (
    <div className={style.page}>
      <DeliveryForm />
      <Cart />
    </div>
  )
}

export default DeliveryPage
