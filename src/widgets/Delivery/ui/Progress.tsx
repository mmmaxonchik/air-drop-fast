import { useContext, useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
import style from "./delivery.module.scss"

enum progressEnum {
  Order = 0,
  PersonalInfo = 50,
  DeliveryInfo = 100,
}

function Progress() {
  const [now, setNow] = useState<progressEnum>(progressEnum.Order)
  const { checkoutStatus } = useContext(OrderCreateContext)
  useEffect(() => {
    switch (checkoutStatus) {
      case 0:
        setNow(progressEnum.Order)
        break
      case 1:
        setNow(progressEnum.PersonalInfo)
        break
      case 2:
        setNow(progressEnum.DeliveryInfo)
        break
    }
  }, [checkoutStatus])

  return (
    <div className={style.progressBar}>
      <div className={style.progressStatus}>
        <p className={checkoutStatus === 0 ? style.active : undefined}>Заказ</p>
        <p className={checkoutStatus === 1 ? style.active : undefined}>
          Личные данные
        </p>
        <p className={checkoutStatus === 2 ? style.active : undefined}>
          Доставка
        </p>
      </div>
      <ProgressBar now={now} className={style.progress} />
    </div>
  )
}

export default Progress
