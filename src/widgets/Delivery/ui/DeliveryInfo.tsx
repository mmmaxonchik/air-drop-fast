import React from "react"
import Button from "react-bootstrap/Button"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"
import style from "./delivery.module.scss"

function DeliveryInfo() {
  return (
    <div>
      <div className="d-grid gap-2 mt-2">
        <Button variant="secondary">Самовывоз</Button>
      </div>
      <div className="d-grid gap-2 mt-2">
        <Button variant="secondary">Доставка</Button>
      </div>

      <FloatingLabel label="Сервис доставки" className={style.deliveryInput}>
        <Form.Select aria-label="Выберете сервис доставки">
          <option>Выберете сервис доставки</option>
          <option value="1">Сдэк</option>
          <option value="2">Почта России</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Пункт выдачи" className={style.deliveryInput}>
        <Form.Select aria-label="Выберете пункт выдачи">
          <option>Выберете пункт выдачи</option>
          <option value="1">Москва, метро Новаторская</option>
          <option value="2">Москва, метро Рязанский Проспект</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  )
}

export default DeliveryInfo
