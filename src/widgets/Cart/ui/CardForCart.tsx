import React from "react"
import { CloseButton } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { getCookie } from "../../../app/cookies/getCookie"
import { setCookie } from "../../../app/cookies/setCookie"
import { IOrder } from "../../Delivery/ui/Order"
import style from "./cart.module.scss"

function deleteItem(id: number | undefined) {
  const cookie = getCookie("Order")
  if (typeof cookie === "string") {
    const itemsArray: IOrder[] = JSON.parse(cookie)
    for (let i = 0; i < itemsArray.length; i++) {
      if (id === itemsArray[i].id) {
        itemsArray.splice(i, 1)
      }
    }
    setCookie("Order", JSON.stringify(itemsArray))
  }
}

function CardForCart({
  name,
  article,
  link,
  category,
  marketplace,
  size,
  price,
  count,
  id,
}: IOrder) {
  return (
    <Card className="mt-2">
      <Card.Body className={style.card}>
        <div className={style.header}>
          <CloseButton
            className={style.closeButton}
            onClick={() => deleteItem(id)}
          />
          <Card.Title>{name}</Card.Title>
        </div>
        <Card.Subtitle className="mb-2 text-muted">{`Артикул: ${article}`}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{`Размер: ${size}`}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{`Цена: ${price}`}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{`Количество: ${count}`}</Card.Subtitle>

        <Card.Link href={link}>Poizon</Card.Link>
      </Card.Body>
    </Card>
  )
}

export default CardForCart
