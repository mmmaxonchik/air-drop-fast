import React from "react"
import { ProgressBar } from "react-bootstrap"
import style from "./delivery.module.scss"

enum progressEnum {
  Order = 6,
  PersonalInfo = 35,
  DeliveryInfo = 68,
  Pay = 95,
}

function Progress() {
  return (
    <div className={style.progressBar}>
      <div className={style.progressStatus}>
        <p className={style.active}>Заказ</p>
        <p>Личные данные</p>
        <p>Доставка</p>
        <p>Оплата</p>
      </div>
      <ProgressBar now={progressEnum.Order} className={style.progress} />
    </div>
  )
}

export default Progress
