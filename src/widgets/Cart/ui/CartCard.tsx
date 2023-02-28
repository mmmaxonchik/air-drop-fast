import { useContext } from "react"
import { CloseButton } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
import { Item } from "../../../pages/OrderCreatePage/types"

import { deleteItem } from "../lib/deleteItem"
import style from "./cart.module.scss"

function CartCard({
  ItemName,
  Article,
  Link,
  CategoryId,
  MarketplaceId,
  RateId,
  Size,
  Price,
  Count,
  id,
}: Item) {
  const { setCart } = useContext(OrderCreateContext)
  const deleteItemFromCart = (id: number | undefined) => {
    if (typeof id !== "undefined") {
      setCart((prev) => prev.filter((item) => item.id !== id))
      deleteItem(id)
    }
  }
  return (
    <Card className="mt-2">
      <Card.Body className={style.card}>
        <div className={style.header}>
          <CloseButton
            className={style.closeButton}
            onClick={() => deleteItemFromCart(id)}
          />
          <Card.Title className={style.cardTitle}>{ItemName}</Card.Title>
        </div>
        <Card.Subtitle
          className={style.cardSubTitle}
        >{`Артикул: ${Article}`}</Card.Subtitle>
        <Card.Subtitle
          className={style.cardSubTitle}
        >{`Размер: ${Size}`}</Card.Subtitle>
        <Card.Subtitle
          className={style.cardSubTitle}
        >{`Цена: ${Price}`}</Card.Subtitle>
        <Card.Subtitle
          className={style.cardSubTitle}
        >{`Количество: ${Count}`}</Card.Subtitle>

        <Card.Link href={Link} className={style.cardLink}>
          Poizon
        </Card.Link>
      </Card.Body>
    </Card>
  )
}

export default CartCard
