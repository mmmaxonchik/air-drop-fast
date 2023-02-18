import { useRef, useState, ChangeEvent } from "react"
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap"
import { Input } from "../../../shared/InputUX"
import { SelectUX } from "../../../shared/SelectUX"
import style from "./delivery.module.scss"
import { setCookie } from "../../../app/cookies/setCookie"
import { getCookie } from "../../../app/cookies/getCookie"

export interface IOrder {
  name: string | undefined
  article: string | undefined
  link: string | undefined
  category: number | undefined
  marketplace: number | undefined
  size: string | undefined
  price: number | undefined
  count: number | undefined
  id: number | undefined
}

function createId(): number {
  return Date.now()
}

function addToCart(value: IOrder) {
  const prevCookie: string | undefined = getCookie("Order")
  if (prevCookie === undefined) {
    setCookie("Order", JSON.stringify([value]))
  } else {
    const prevValue: IOrder[] = JSON.parse(prevCookie)
    const newValue = [...prevValue, value]
    setCookie("Order", JSON.stringify(newValue))
  }
}

function Order() {
  const nameRef = useRef<HTMLInputElement>(null)
  const articleRef = useRef<HTMLInputElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const sizeRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const countRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const marketRef = useRef<HTMLSelectElement>(null)
  const clickHandler = () => {
    //Validation - Condition
    const selectCondition =
      !isNaN(Number(categoryRef.current?.value)) &&
      !isNaN(Number(marketRef.current?.value))
    const nameCondition =
      0 < Number(nameRef.current?.value.length) &&
      Number(nameRef.current?.value.length) <= 80
    const articleCondition =
      0 < Number(articleRef.current?.value.length) &&
      Number(articleRef.current?.value.length) <= 80
    const pushCondition =
      sizeRef.current?.value.length &&
      priceRef.current?.value.length &&
      countRef.current?.value.length

    if (selectCondition && nameCondition && articleCondition && pushCondition) {
      const order: IOrder = {
        name: nameRef.current?.value,
        article: articleRef.current?.value,
        link: linkRef.current?.value,
        category: Number(categoryRef.current?.value),
        marketplace: Number(marketRef.current?.value),
        size:
          category === 0
            ? sizeRef.current?.value + sneakersSize
            : sizeRef.current?.value,
        price: Number(priceRef.current.value),
        count: Number(countRef.current.value),
        id: createId(),
      }
      addToCart(order)
    } else {
      alert("Заполнены не все поля, или введены некорректные данные")
    }
  }
  const [category, setCategory] = useState<number>(0)
  const [sneakersSize, setSneakersSize] = useState<string | undefined>("EU")
  const sizeSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSneakersSize(event.target.value)
  }
  const selectCategory = () => {
    setCategory(Number(categoryRef.current?.value))
  }
  return (
    <div className={style.deliveryPage}>
      <Input
        label="Название"
        maxLength={80}
        state={""}
        inputRef={nameRef}
        className="mt-2"
        inputType="text"
        required={true}
        regex={/^.{1,}$/}
        errorMessage="Название может иметь от 1 до 80 символов"
      />
      <Input
        label="Артикул"
        maxLength={80}
        state={""}
        inputRef={articleRef}
        className="mt-2"
        inputType="text"
        required={true}
        regex={/^.{1,}$/}
        errorMessage="Артикул может иметь от 1 до 80 символов"
      />
      <Input
        label="Ссылка*"
        maxLength={100}
        state={""}
        inputRef={linkRef}
        className="mt-2"
        inputType="text"
      />
      <FloatingLabel label={"Категория"} className={"mt-2"}>
        <Form.Select
          aria-label={"Категория"}
          ref={categoryRef}
          className={style.deliverySelect}
          onChange={selectCategory}
        >
          <option>{"Выберите категорию"}</option>
          {["Кроссовки", "Одежда", "Аксессуары"].map((value, index) => (
            <option key={index} value={index}>
              {value}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <SelectUX
        label={"Маркетплейс"}
        inputRef={marketRef}
        options={["Poizon"]}
        className="mt-2"
        firstOption="Выберите маркетплейс"
      />
      {category === 0 ? (
        <Row>
          <Col>
            <Input
              label="Размер"
              state={""}
              inputRef={sizeRef}
              className="mt-2"
              inputType="number"
              required={true}
              regex={/^\d+(?:[\.]\d+)?$/}
              errorMessage="Размер должен быть формате числа, например 35"
            />
          </Col>
          <Col>
            <FloatingLabel label="Размерная сетка" className="mt-2">
              <Form.Select
                onChange={sizeSelectHandler}
                className={style.deliverySelect}
              >
                <option value="EU">EU</option>
                <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="Custom">Custom</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      ) : null}
      {category === 1 ? (
        <Input
          label="Размер"
          state={""}
          inputRef={sizeRef}
          className="mt-2"
          inputType="text"
          required={true}
          regex={/^[0-9]{1,2}$/}
          errorMessage="Размер может иметь от 1 до 20 символов"
        />
      ) : null}
      <Input
        label="Цена (¥)"
        state={""}
        inputRef={priceRef}
        className="mt-2"
        inputType="number"
        required={true}
        regex={/^[0-9]{1,6}$/}
        errorMessage="Цена не должна превышать 100000¥"
      />
      <Input
        label="Количество"
        state={""}
        inputRef={countRef}
        className="mt-2"
        inputType="number"
        required={true}
        regex={/^[0-9]{1,2}$/}
        errorMessage="Количество не должно превышать 100 шт."
      />
      <div className="mt-2 d-grid gap-2 mt-2">
        <Button variant="secondary" onClick={clickHandler}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  )
}

export default Order
