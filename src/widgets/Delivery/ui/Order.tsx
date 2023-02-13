import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "react-bootstrap"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form/"
import { Input } from "../../../shared/InputUX"
import style from "./delivery.module.scss"

function Order() {
  const nameRef = useRef<HTMLInputElement>(null)
  const articleRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const marketRef = useRef<HTMLSelectElement>(null)
  console.log(categoryRef.current)

  useEffect(() => {
    console.log(categoryRef.current?.value)
  }, [categoryRef.current?.value, marketRef.current?.value])

  return (
    <div className={style.deliveryPage}>
      <Input
        label="Название"
        state={""}
        inputRef={nameRef}
        className="mt-2"
        inputType="text"
      ></Input>
      <Input
        label="Артикул"
        state={""}
        inputRef={articleRef}
        className="mt-2"
        inputType="text"
      ></Input>
      <FloatingLabel label="Категория" className="mt-2">
        <Form.Select ref={categoryRef}>
          <option value="0">Выберите категорию</option>
          <option value="1">Кроссовки</option>
          <option value="2">Одежда</option>
          <option value="3">Аксессуары</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label="Маркетплейс" className="mt-2">
        <Form.Select ref={marketRef}>
          <option>Выберите маркетплейс</option>
          <option value="1">Poizon</option>
        </Form.Select>
      </FloatingLabel>
      <Input
        label="Цена"
        state={""}
        inputRef={priceRef}
        className="mt-2"
        inputType="number"
      ></Input>
      <Input
        label="Количество"
        state={""}
        inputRef={countRef}
        className="mt-2"
        inputType="number"
      ></Input>
      <div className="mt-2 d-grid gap-2 mt-2">
        <Button variant="secondary">Добавить в корзину</Button>
      </div>
    </div>
  )
}

export default Order
