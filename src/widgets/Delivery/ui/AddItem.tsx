import { useState, ChangeEvent, useContext } from "react"
import { useForm } from "react-hook-form"
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap"
import { createOrderId } from "../lib/createOrderId"
import { addToCart } from "../lib/addToCart"
import { CartContext } from "../../Cart"
import { getCookie } from "../../../app/cookies/getCookie"
import { IOrder } from "../lib/orderType"
import { DeliveryContext } from "./DeliveryForm"

enum categoryState {
  None,
  Sneakers,
  Clothes,
  Accessories,
}
enum sizeChartState {
  EU,
  CUSTOM,
}
interface IFormInputs {
  ItemName: string
  Article: string
  Link: string
  Size: string
  Price: number
  Count: number
  Category: categoryState
}

export default function AddItem() {
  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
  })

  //category
  const [category, setCategory] = useState<categoryState>(categoryState.None)
  const selectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(
      isNaN(Number(event.target.value))
        ? categoryState.None
        : Number(event.target.value)
    )
  }
  //sizeChart
  const [sizeChart, setSizeChart] = useState<sizeChartState>(sizeChartState.EU)
  const selectSizeChart = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setSizeChart(
      isNaN(Number(event.target.value))
        ? sizeChartState.EU
        : Number(event.target.value)
    )
  }
  //submit form = add to card
  const { setCart } = useContext(CartContext)
  const onSubmit = (data: any) => {
    const newItem = { ...data, id: createOrderId() }
    setCart((prev) => [...prev, newItem])
    addToCart(newItem)
  }
  //next step
  const { setDeliveryState } = useContext(DeliveryContext)
  const nextStep = () => {
    const cookie = getCookie("Order")
    if (typeof cookie === "string") {
      const cartArray: IOrder[] = JSON.parse(cookie)
      const success = () => {
        document.documentElement.scrollTop = 0
        setDeliveryState(1)
      }
      cartArray.length > 0 ? success() : alert("Корзина пуста!")
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mt-2">
        <FloatingLabel label={"Название"}>
          <Form.Control
            type="text"
            placeholder="Название"
            maxLength={80}
            isInvalid={typeof errors.ItemName !== "undefined" ? true : false}
            required
            {...register("ItemName", {
              maxLength: {
                value: 80,
                message: "Название товара может иметь от 1 до 80 символов",
              },
              required: "Укажите название товара",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.ItemName !== "undefined"
              ? errors.ItemName.message
              : null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-2">
        <FloatingLabel label={"Артикул"}>
          <Form.Control
            type="text"
            placeholder="Артикул"
            maxLength={80}
            isInvalid={typeof errors.Article !== "undefined" ? true : false}
            required
            {...register("Article", {
              maxLength: {
                value: 80,
                message: "Артикул товара может иметь от 1 до 80 символов",
              },
              required: "Укажите артикул товара",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.Article !== "undefined"
              ? errors.Article.message
              : null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-2">
        <FloatingLabel label={"Ссылка*"}>
          <Form.Control
            type="text"
            placeholder="Ссылка*"
            maxLength={100}
            isInvalid={typeof errors.Link !== "undefined" ? true : false}
            {...register("Link", {
              maxLength: {
                value: 100,
                message: "Ссылка может иметь от 1 до 100 символов",
              },
            })}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.Link !== "undefined" ? errors.Link.message : null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <FloatingLabel label={"Категория"} className={"mt-2"}>
        <Form.Select
          aria-label={"Категория"}
          {...register("Category")}
          onChange={selectCategory}
        >
          {["Выберите категорию", "Кроссовки", "Одежда", "Аксессуары"].map(
            (value, index) => (
              <option key={index} value={index}>
                {value}
              </option>
            )
          )}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label={"Маркетплейс"} className={"mt-2"}>
        <Form.Select aria-label={"Маркетплейс"}>
          <option>{"Выберите маркетплейс"}</option>
          {["Poizon"].map((value, index) => (
            <option key={index} value={index}>
              {value}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      {category === categoryState.Sneakers ? (
        <Row>
          <Col>
            {sizeChart === sizeChartState.EU ? (
              <Form.Group className="mt-2">
                <FloatingLabel label={"Размер"}>
                  <Form.Control
                    type="number"
                    inputMode="numeric"
                    placeholder="Размер"
                    isInvalid={
                      typeof errors.Size !== "undefined" ? true : false
                    }
                    required
                    {...register("Size", {
                      min: {
                        value: 1,
                        message: "Минимальный размер в данной сетке 52 EUR",
                      },
                      max: {
                        value: 52,
                        message: "Максимальный размер в данной сетке 52 EUR",
                      },
                      required: "Укажите размер товара",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeof errors.Size !== "undefined"
                      ? errors.Size.message
                      : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            ) : null}
            {sizeChart === sizeChartState.CUSTOM ? (
              <Form.Group className="mt-2">
                <FloatingLabel label={"Размер"}>
                  <Form.Control
                    type="text"
                    placeholder="Размер"
                    isInvalid={
                      typeof errors.Size !== "undefined" ? true : false
                    }
                    required
                    {...register("Size", {
                      maxLength: {
                        value: 10,
                        message: "Максимальная длинна размера 10 символов",
                      },
                      minLength: {
                        value: 1,
                        message: "Минимальная длинна размера 1 символ",
                      },
                      required: "Укажите размер товара",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeof errors.Size !== "undefined"
                      ? errors.Size.message
                      : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            ) : null}
          </Col>
          <Col>
            <FloatingLabel
              label="Размерная сетка"
              className="mt-2"
              onChange={selectSizeChart}
            >
              <Form.Select>
                {["EU", "Custom"].map((value, index) => (
                  <option key={index} value={index}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      ) : null}
      {category === categoryState.Clothes ? (
        <Form.Group className="mt-2">
          <FloatingLabel label={"Размер"}>
            <Form.Control
              type="text"
              placeholder="Размер"
              isInvalid={typeof errors.Size !== "undefined" ? true : false}
              required
              {...register("Size", {
                maxLength: {
                  value: 10,
                  message: "Максимальная длинна размера 10 символов",
                },
                minLength: {
                  value: 1,
                  message: "Минимальная длинна размера 1 символ",
                },
                required: "Укажите размер товара",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.Size !== "undefined" ? errors.Size.message : null}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      ) : null}
      <Form.Group className="mt-2">
        <FloatingLabel label={"Цена"}>
          <Form.Control
            type="number"
            placeholder="Цена"
            isInvalid={typeof errors.Price !== "undefined" ? true : false}
            required
            {...register("Price", {
              min: {
                value: 1,
                message: "Минимальная цена товара 100",
              },
              max: {
                value: 100000,
                message: "Максимальная цена товара 100000",
              },
              required: "Укажите размер товара",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.Price !== "undefined" ? errors.Price.message : null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="mt-2">
        <FloatingLabel label={"Количество"}>
          <Form.Control
            type="number"
            placeholder="Количество"
            isInvalid={typeof errors.Count !== "undefined" ? true : false}
            required
            {...register("Count", {
              min: {
                value: 1,
                message: "Минимальное количество товара 1 шт.",
              },
              max: {
                value: 10,
                message: "Максимальное количество товара 10 шт.",
              },
              required: "Укажите размер товара",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {typeof errors.Count !== "undefined" ? errors.Count.message : null}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <div className="mt-2 d-grid gap-2 mt-2">
        <Button variant="dark" type="submit">
          Добавить в корзину
        </Button>
        <Button variant="dark" onClick={() => nextStep()}>
          Продолжить
        </Button>
      </div>
    </Form>
  )
}
