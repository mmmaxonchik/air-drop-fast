import { ChangeEvent, useContext } from "react"
import { useForm, useWatch } from "react-hook-form"
import { FloatingLabel, Form, Button, Row, Col } from "react-bootstrap"
//Lib
import { createItemId } from "../lib/createItemId"
import { addItem } from "../lib/addItem"
import { InputLoader } from "../../../shared/InputLoader"
//Entities
import { setSelect } from "../../../entities/setSelect"
//Cookie
import { getCookie } from "../../../app/cookies/getCookie"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Type
import {
  Category,
  Item,
  Marketplace,
  Rate,
} from "../../../pages/OrderCreatePage/types"
//React-Query-Api
import { UseQueryResult } from "react-query"

enum sizeChartState {
  None,
  EU,
  CUSTOM,
}

interface FormInputs {
  ItemName: string
  Article: string
  Link: string
  Size: string
  Price: number
  Count: number
  RateId: number
  MarketplaceId: number
  CategoryId: number
  sizeChartId: number
}

interface AddItemProps {
  fetchRates: UseQueryResult<Rate[]>
  fetchCategories: UseQueryResult<Category[]>
  fetchMarketplaces: UseQueryResult<Marketplace[]>
}

export default function AddItem({
  fetchRates,
  fetchCategories,
  fetchMarketplaces,
}: AddItemProps) {
  //hook-form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues: {
      CategoryId: 0,
      MarketplaceId: 0,
      RateId: 0,
      sizeChartId: sizeChartState.EU,
    },
  })

  const categoryId = useWatch({ control, name: "CategoryId" })
  const rateId = useWatch({ control, name: "RateId" })
  const marketplaceId = useWatch({ control, name: "MarketplaceId" })
  const sizeChartId = useWatch({ control, name: "sizeChartId" })

  //Category
  const selectCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("CategoryId", Number(event.target.value))
  }
  //Marketplace
  const selectMarketplace = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("MarketplaceId", Number(event.target.value))
  }
  //Rate
  const selectRate = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("RateId", Number(event.target.value))
  }
  //SizeChartId
  const selectSizeChart = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue("sizeChartId", Number(event.target.value))
  }

  //submit form = add to card
  const { setCart, setCheckoutStatus } = useContext(OrderCreateContext)
  const onSubmit = (data: any) => {
    const add = () => {
      const newItem = {
        ...data,
        id: createItemId(),
        Size:
          sizeChartId === sizeChartState.EU
            ? (data.Size += "EU")
            : (data.Size += ""),
      }
      setCart((prev) => [...prev, newItem])
      addItem(newItem)
      reset()
    }
    categoryId && marketplaceId && rateId && sizeChartId
      ? add()
      : alert("Введите все данные о товаре.")
  }
  //next step
  const nextStep = () => {
    const cookie = getCookie("Order")
    if (typeof cookie === "string") {
      const cartArray: Item[] = JSON.parse(cookie)
      const success = () => {
        document.documentElement.scrollTop = 0
        setCheckoutStatus(1)
      }
      cartArray.length > 0 ? success() : alert("Корзина пуста.")
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

      {fetchCategories.isLoading ? (
        <InputLoader />
      ) : (
        <FloatingLabel label={"Категория"} className={"mt-2"}>
          <Form.Select
            aria-label={"Категория"}
            {...register("CategoryId")}
            defaultValue={0}
            onChange={selectCategory}
          >
            <option value={0}>{"Выберете категорию"}</option>
            {fetchCategories.data?.map(({ Name, Id }) => (
              <option key={Id} value={Id}>
                {Name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      )}

      {fetchMarketplaces.isLoading ? (
        <InputLoader />
      ) : (
        <FloatingLabel label={"Маркетплейс"} className={"mt-2"}>
          <Form.Select
            aria-label={"Маркетплейс"}
            {...register("MarketplaceId")}
            onChange={selectMarketplace}
            defaultValue={0}
          >
            <option value={0}>{"Выберите маркетплейс"}</option>
            {fetchMarketplaces.data?.map(({ Id, Name }) => (
              <option key={Id} value={Id}>
                {Name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      )}

      {categoryId ===
      setSelect({ Name: "Кроссовки", ArrayAns: fetchCategories.data }) ? (
        <Row>
          <Col>
            <Form.Group className="mt-2">
              <FloatingLabel label={"Размер"}>
                <Form.Control
                  type={categoryId === sizeChartState.EU ? "number" : "text"}
                  inputMode={
                    categoryId === sizeChartState.EU ? "numeric" : "text"
                  }
                  disabled={categoryId === sizeChartState.None ? true : false}
                  placeholder="Размер"
                  isInvalid={typeof errors.Size !== "undefined" ? true : false}
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
          </Col>
          <Col>
            <FloatingLabel
              label="Размерная сетка"
              className="mt-2"
              {...register("sizeChartId")}
              onChange={selectSizeChart}
              defaultValue={sizeChartState.None}
            >
              <Form.Select>
                <option value={0}>{"Выберите размерную сетку"}</option>
                {["EU", "Custom"].map((value, index) => (
                  <option key={index} value={index + 1}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      ) : null}
      {categoryId ===
      setSelect({ Name: "Одежда", ArrayAns: fetchCategories.data }) ? (
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
      <Row>
        <Col>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Цена"}>
              <Form.Control
                type="number"
                placeholder="Цена"
                isInvalid={typeof errors.Price !== "undefined" ? true : false}
                disabled={rateId ? false : true}
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
                  required: "Укажите цену товара",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.Price !== "undefined"
                  ? errors.Price.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col>
          {fetchRates.isLoading ? (
            <InputLoader />
          ) : (
            <FloatingLabel
              label="Валюта"
              className="mt-2"
              {...register("RateId")}
              onChange={selectRate}
              defaultValue={0}
            >
              <Form.Select {...register("RateId")} onChange={selectRate}>
                <option value={0}>{"Выберете валюту"}</option>
                {fetchRates.data?.map(({ Name, Id }) => (
                  <option key={Id} value={Id}>
                    {Name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}
        </Col>
      </Row>
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
