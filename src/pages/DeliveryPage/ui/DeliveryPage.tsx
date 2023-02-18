import { Cart } from "../../../widgets/Cart"
import { Delivery } from "../../../widgets/Delivery"
import style from "./deliveryPage.module.scss"

function DeliveryPage() {
  return (
    <div className={style.page}>
      <Delivery />
      <Cart />
    </div>
  )
}

export default DeliveryPage
