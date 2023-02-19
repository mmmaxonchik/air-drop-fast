import { useContext, useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import style from "./delivery.module.scss"
import { DeliveryContext } from "./DeliveryForm"

enum progressEnum {
  Order = 0,
  PersonalInfo = 35,
  DeliveryInfo = 68,
  Pay = 100,
}

function Progress() {
  const [now, setNow] = useState<progressEnum>(progressEnum.Order)
  const { deliveryState } = useContext(DeliveryContext)
  useEffect(() => {
    switch (deliveryState) {
      case 0:
        setNow(progressEnum.Order)
        break
      case 1:
        setNow(progressEnum.PersonalInfo)
        break
      case 2:
        setNow(progressEnum.DeliveryInfo)
        break
      case 3:
        setNow(progressEnum.Pay)
        break
    }
  }, [deliveryState])

  return (
    <div className={style.progressBar}>
      <div className={style.progressStatus}>
        <p className={deliveryState === 0 ? style.active : undefined}>Заказ</p>
        <p className={deliveryState === 1 ? style.active : undefined}>
          Личные данные
        </p>
        <p className={deliveryState === 2 ? style.active : undefined}>
          Доставка
        </p>
        <p className={deliveryState === 3 ? style.active : undefined}>Оплата</p>
      </div>
      <ProgressBar now={now} className={style.progress} />
    </div>
  )
}

export default Progress
