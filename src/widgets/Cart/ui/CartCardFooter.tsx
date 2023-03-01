import React from "react"
import { Card, Placeholder } from "react-bootstrap"
import { UseMutationResult } from "react-query"
import { finalPrice } from "../../../pages/OrderCreatePage/api/Item"
import { Item } from "../../../pages/OrderCreatePage/types"
import style from "./cart.module.scss"

interface CartCardFooterProps {
  fetchFinalPrice: UseMutationResult<finalPrice, unknown, Item[], unknown>
}

function CartCardFooter({ fetchFinalPrice }: CartCardFooterProps) {
  return (
    <div className="mt-2">
      <Card className={style.cartCardFooter}>
        {fetchFinalPrice.isLoading ? (
          <Placeholder as="p" animation="wave">
            <Placeholder xs={3} bg="secondary" />
          </Placeholder>
        ) : (
          <>
            {fetchFinalPrice.isError ? (
              <Card.Text>{`Итого: ${0}₽`}</Card.Text>
            ) : (
              <Card.Text>{`Итого: ${fetchFinalPrice.data?.FinalPrice}₽`}</Card.Text>
            )}
          </>
        )}
      </Card>
    </div>
  )
}

export default CartCardFooter
