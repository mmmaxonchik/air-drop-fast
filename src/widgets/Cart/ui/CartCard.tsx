import { useContext, useEffect, useState } from "react"
import { CloseButton } from "react-bootstrap"
import Card from "react-bootstrap/Card"
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
import {
  Category,
  Item,
  Marketplace,
  Rate,
} from "../../../pages/OrderCreatePage/types"
import { UseQueryResult } from "react-query"

import { deleteItem } from "../lib/deleteItem"
import style from "./cart.module.scss"
import { CartCardLoader } from "../../../shared/CartCardLoader"

interface CartCardProps extends Item {
  fetchRates: UseQueryResult<Rate[]>
  fetchCategories: UseQueryResult<Category[]>
  fetchMarketplaces: UseQueryResult<Marketplace[]>
}

function CartCard({
  ItemName,
  Article,
  Link,
  Size,
  Price,
  Count,
  id,
  RateId,
  MarketplaceId,
  fetchRates,
  fetchCategories,
  fetchMarketplaces,
}: CartCardProps) {
  const { setCart } = useContext(OrderCreateContext)
  const deleteItemFromCart = (id: number | undefined) => {
    if (typeof id !== "undefined") {
      setCart((prev) => prev.filter((item) => item.id !== id))
      deleteItem(id)
    }
  }
  const [rate, setRate] = useState<string>("")
  const [marketplace, setMarketplace] = useState<string>("")

  useEffect(() => {
    fetchRates.data?.forEach(({ Name, Id }) => {
      if (Number(Id) === Number(RateId)) {
        setRate(Name)
      }
    })
    fetchMarketplaces.data?.forEach(({ Name, Id }) => {
      if (Number(Id) === Number(MarketplaceId)) {
        setMarketplace(Name)
      }
    })
  }, [fetchRates.data, fetchMarketplaces.data])
  return (
    <>
      {fetchRates.isLoading &&
      fetchCategories.isLoading &&
      fetchMarketplaces.isLoading ? (
        <CartCardLoader />
      ) : (
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
            >{`Цена: ${Price}${rate}`}</Card.Subtitle>
            <Card.Subtitle
              className={style.cardSubTitle}
            >{`Количество: ${Count}`}</Card.Subtitle>
            {typeof Link !== "undefined" ? (
              <Card.Link href={Link} className={style.cardLink}>
                {marketplace}
              </Card.Link>
            ) : null}
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default CartCard
