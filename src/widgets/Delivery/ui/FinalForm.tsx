import { ChangeEvent, useState, useContext } from "react"
import { Form, FloatingLabel, ButtonGroup, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { getCookie } from "../../../app/cookies/getCookie"
import { IOrder } from "../lib/orderType"
import { DeliveryContext, enumDeliveryState } from "./DeliveryForm"

interface FinalFormProps {
  step: enumDeliveryState
}

enum DeliveryType {
  Pickup,
  Delivery,
}

enum Posts {
  Russia_Post = "Почта России",
  SDEK = "СДЭК",
}

enum PayMethod {
  MK_TINKOFF = "Михаил К. 5536914148518362 Тинькофф",
  MK_SBSER = "Михаил К. 4276380130517951 Сбербанк",
}

interface IFormInputs {
  Name: string
  Surname: string
  Email: string
  PhoneNumber: string
  Telegram: string
  DeliveryType: string
  Pickup: string
  Region: string
  City: string
  Street: string
  HouseNumber: string
  PostIndex: string
  File: string
  PayType: string
}

function FinalForm({ step }: FinalFormProps) {
  //hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
  })

  //DeliveryType
  const [deliveryType, setDeliveryType] = useState<DeliveryType>(
    DeliveryType.Pickup
  )
  const selectDeliveryType = (id: DeliveryType) => {
    if (id === DeliveryType.Delivery) {
      setValue("Pickup", "")
      setDeliveryType(DeliveryType.Delivery)
    }
    if (id === DeliveryType.Pickup) {
      setValue("DeliveryType", "")
      setValue("Region", "")
      setValue("City", "")
      setValue("Street", "")
      setValue("HouseNumber", "")
      setValue("PostIndex", "")
      setDeliveryType(DeliveryType.Pickup)
    }
  }

  //Posts
  const [posts, setPosts] = useState<Posts>(Posts.Russia_Post)
  const selectPost = (event: ChangeEvent<HTMLSelectElement>) => {
    const post = event.target.value
    if (post === Posts.Russia_Post) {
      setPosts(post)
    }
    if (post === Posts.SDEK) {
      setPosts(post)
    }
  }

  //Pay
  const [pay, setPay] = useState<PayMethod>(PayMethod.MK_TINKOFF)
  const selectPay = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPay = event.target.value
    if (newPay === PayMethod.MK_TINKOFF) {
      setPay(newPay)
    }
  }

  //Steps
  const { setDeliveryState } = useContext(DeliveryContext)
  const nextStep = (id: number) => {
    setDeliveryState(id)
  }
  const prevStep = (id: number) => {
    setDeliveryState(id - 1)
  }

  //Submit
  const onSubmit = (data: IFormInputs) => {
    console.log(data)
    if (step === enumDeliveryState.PersonalInfo) {
      nextStep(enumDeliveryState.PersonalInfo + 1)
    }
    if (
      step === enumDeliveryState.DeliveryInfo &&
      (data.Pickup.length > 0 || data.Region.length > 0)
    ) {
      nextStep(enumDeliveryState.DeliveryInfo + 1)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {step === enumDeliveryState.PersonalInfo ? (
        <>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Имя"}>
              <Form.Control
                type="text"
                placeholder="Имя"
                maxLength={100}
                isInvalid={typeof errors.Name !== "undefined" ? true : false}
                required
                {...register("Name", {
                  maxLength: {
                    value: 100,
                    message: "Имя может иметь от 1 до 100 символов",
                  },
                  required: "Укажите имя",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.Name !== "undefined"
                  ? errors.Name.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Фамилия"}>
              <Form.Control
                type="text"
                placeholder="Фамилия"
                maxLength={100}
                isInvalid={typeof errors.Surname !== "undefined" ? true : false}
                required
                {...register("Surname", {
                  maxLength: {
                    value: 100,
                    message: "Фамилия может иметь от 1 до 100 символов",
                  },
                  required: "Укажите фамилию",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.Surname !== "undefined"
                  ? errors.Surname.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Номер телефона"}>
              <Form.Control
                inputMode="tel"
                type="tel"
                placeholder="Номер телефона"
                isInvalid={
                  typeof errors.PhoneNumber !== "undefined" ? true : false
                }
                required
                {...register("PhoneNumber", {
                  pattern: {
                    value: /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/,
                    message: "Введите номер телефона в +7 9** ** **",
                  },
                  required: "Укажите номер телефона",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.PhoneNumber !== "undefined"
                  ? errors.PhoneNumber.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Почта"}>
              <Form.Control
                inputMode="email"
                type="email"
                placeholder="Почта"
                isInvalid={typeof errors.Email !== "undefined" ? true : false}
                required
                {...register("Email", {
                  pattern: {
                    value:
                      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                    message: "Введите почту в формате example@email.com",
                  },
                  required: "Укажите почту",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.Email !== "undefined"
                  ? errors.Email.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mt-2">
            <FloatingLabel label={"Телеграм"}>
              <Form.Control
                type="text"
                placeholder="Телеграм"
                maxLength={33}
                isInvalid={
                  typeof errors.Telegram !== "undefined" ? true : false
                }
                required
                {...register("Telegram", {
                  pattern: {
                    value: /[@].{1,}/,
                    message: "Введите имя пользователя в формате @example",
                  },
                  minLength: {
                    value: 2,
                    message: "Имя пользователя может иметь от 2 до 32 символов",
                  },
                  maxLength: {
                    value: 33,
                    message: "Имя пользователя может иметь от 2 до 33 символов",
                  },
                  required: "Укажите имя пользователя",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.Telegram !== "undefined"
                  ? errors.Telegram.message
                  : null}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <div className="mt-2 d-grid gap-2 mt-2">
            <Button variant="dark" type="submit">
              Продолжить
            </Button>
            <Button
              variant="dark"
              onClick={() => prevStep(enumDeliveryState.PersonalInfo)}
            >
              Назад
            </Button>
          </div>
        </>
      ) : null}
      {step === enumDeliveryState.DeliveryInfo ? (
        <>
          <div className="d-grid gap-1">
            <ButtonGroup className="mt-2">
              <Button
                variant="dark"
                onClick={() => selectDeliveryType(DeliveryType.Delivery)}
              >
                Доставка
              </Button>
              <Button
                variant="dark"
                onClick={() => selectDeliveryType(DeliveryType.Pickup)}
              >
                Самовывоз
              </Button>
            </ButtonGroup>
          </div>

          {deliveryType === DeliveryType.Delivery ? (
            <>
              <FloatingLabel label={"Способ доставки"} className={"mt-2"}>
                <Form.Select
                  aria-label={"Способ доставки"}
                  defaultValue={posts}
                  {...register("DeliveryType")}
                  onChange={selectPost}
                >
                  <option value={Posts.Russia_Post}>{Posts.Russia_Post}</option>
                  <option value={Posts.SDEK}>{Posts.SDEK}</option>
                </Form.Select>
              </FloatingLabel>
              {posts === Posts.Russia_Post ? (
                <>
                  <Form.Group className="mt-2">
                    <FloatingLabel label={"Регион"}>
                      <Form.Control
                        type="text"
                        placeholder="Регион"
                        maxLength={100}
                        isInvalid={
                          typeof errors.Region !== "undefined" ? true : false
                        }
                        required
                        {...register("Region", {
                          maxLength: {
                            value: 100,
                            message: "Регион может иметь от 1 до 100 символов",
                          },
                          required: "Укажите регион",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {typeof errors.Region !== "undefined"
                          ? errors.Region.message
                          : null}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <FloatingLabel label={"Город"}>
                      <Form.Control
                        type="text"
                        placeholder="Город"
                        maxLength={100}
                        isInvalid={
                          typeof errors.City !== "undefined" ? true : false
                        }
                        required
                        {...register("City", {
                          maxLength: {
                            value: 100,
                            message: "Город может иметь от 1 до 100 символов",
                          },
                          required: "Укажите регион",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {typeof errors.City !== "undefined"
                          ? errors.City.message
                          : null}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <FloatingLabel label={"Улица"}>
                      <Form.Control
                        type="text"
                        placeholder="Улица"
                        maxLength={100}
                        isInvalid={
                          typeof errors.Street !== "undefined" ? true : false
                        }
                        required
                        {...register("Street", {
                          maxLength: {
                            value: 100,
                            message: "Улица может иметь от 1 до 100 символов",
                          },
                          required: "Укажите улицу",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {typeof errors.Street !== "undefined"
                          ? errors.Street.message
                          : null}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <FloatingLabel label={"Номер дома/строения"}>
                      <Form.Control
                        type="text"
                        placeholder="Номер дома/строения"
                        maxLength={100}
                        isInvalid={
                          typeof errors.HouseNumber !== "undefined"
                            ? true
                            : false
                        }
                        required
                        {...register("HouseNumber", {
                          maxLength: {
                            value: 100,
                            message:
                              "Номер дома может иметь от 1 до 100 символов",
                          },
                          required: "Укажите номер дома/строения",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {typeof errors.HouseNumber !== "undefined"
                          ? errors.HouseNumber.message
                          : null}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <FloatingLabel label={"Почтовый индекс"}>
                      <Form.Control
                        type="text"
                        placeholder="Почтовый индекс"
                        maxLength={100}
                        isInvalid={
                          typeof errors.PostIndex !== "undefined" ? true : false
                        }
                        required
                        {...register("PostIndex", {
                          maxLength: {
                            value: 100,
                            message:
                              "Почтовый индекс может иметь от 1 до 100 символов",
                          },
                          required: "Укажите почтовый индекс",
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {typeof errors.PostIndex !== "undefined"
                          ? errors.PostIndex.message
                          : null}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </>
              ) : null}
              {posts === Posts.SDEK ? (
                <>
                  <h5 className="mt-2">Ближайший пункт выдачи СДЭК</h5>
                  <>
                    <Form.Group className="mt-2">
                      <FloatingLabel label={"Регион"}>
                        <Form.Control
                          type="text"
                          placeholder="Регион"
                          maxLength={100}
                          isInvalid={
                            typeof errors.Region !== "undefined" ? true : false
                          }
                          required
                          {...register("Region", {
                            maxLength: {
                              value: 100,
                              message:
                                "Регион может иметь от 1 до 100 символов",
                            },
                            required: "Укажите регион",
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {typeof errors.Region !== "undefined"
                            ? errors.Region.message
                            : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <FloatingLabel label={"Город"}>
                        <Form.Control
                          type="text"
                          placeholder="Город"
                          maxLength={100}
                          isInvalid={
                            typeof errors.City !== "undefined" ? true : false
                          }
                          required
                          {...register("City", {
                            maxLength: {
                              value: 100,
                              message: "Город может иметь от 1 до 100 символов",
                            },
                            required: "Укажите регион",
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {typeof errors.City !== "undefined"
                            ? errors.City.message
                            : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <FloatingLabel label={"Улица"}>
                        <Form.Control
                          type="text"
                          placeholder="Улица"
                          maxLength={100}
                          isInvalid={
                            typeof errors.Street !== "undefined" ? true : false
                          }
                          required
                          {...register("Street", {
                            maxLength: {
                              value: 100,
                              message: "Улица может иметь от 1 до 100 символов",
                            },
                            required: "Укажите улицу",
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {typeof errors.Street !== "undefined"
                            ? errors.Street.message
                            : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <FloatingLabel label={"Номер дома/строения"}>
                        <Form.Control
                          type="text"
                          placeholder="Номер дома/строения"
                          maxLength={100}
                          isInvalid={
                            typeof errors.HouseNumber !== "undefined"
                              ? true
                              : false
                          }
                          required
                          {...register("HouseNumber", {
                            maxLength: {
                              value: 100,
                              message:
                                "Номер дома может иметь от 1 до 100 символов",
                            },
                            required: "Укажите номер дома/строения",
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {typeof errors.HouseNumber !== "undefined"
                            ? errors.HouseNumber.message
                            : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <FloatingLabel label={"Почтовый индекс"}>
                        <Form.Control
                          type="text"
                          placeholder="Почтовый индекс"
                          maxLength={100}
                          isInvalid={
                            typeof errors.PostIndex !== "undefined"
                              ? true
                              : false
                          }
                          required
                          {...register("PostIndex", {
                            maxLength: {
                              value: 100,
                              message:
                                "Почтовый индекс может иметь от 1 до 100 символов",
                            },
                            required: "Укажите почтовый индекс",
                          })}
                        />
                        <Form.Control.Feedback type="invalid">
                          {typeof errors.PostIndex !== "undefined"
                            ? errors.PostIndex.message
                            : null}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </>
                </>
              ) : null}
            </>
          ) : null}

          {deliveryType === DeliveryType.Pickup ? (
            <FloatingLabel label={"Категория"} className={"mt-2"}>
              <Form.Select aria-label={"Категория"} {...register("Pickup")}>
                {[
                  "Выберете пункт выдачи",
                  "Москва, метро Новаторская",
                  "Москва, метро Рязанский Проспект",
                ].map((value, index) => (
                  <option
                    key={index}
                    value={value === "Выберете пункт выдачи" ? "" : value}
                  >
                    {value}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          ) : null}

          <div className="mt-2 d-grid gap-2 mt-2">
            <Button variant="dark" type="submit">
              Продолжить
            </Button>
            <Button
              variant="dark"
              onClick={() => prevStep(enumDeliveryState.DeliveryInfo)}
            >
              Назад
            </Button>
          </div>
        </>
      ) : null}
      {step === enumDeliveryState.Pay ? (
        <>
          <FloatingLabel label={"Оплата"} className={"mt-2"}>
            <Form.Select
              required
              aria-label={"Оплата"}
              defaultValue={pay}
              {...register("PayType")}
              onChange={selectPay}
            >
              <option value={PayMethod.MK_TINKOFF}>
                {PayMethod.MK_TINKOFF}
              </option>
              <option value={PayMethod.MK_SBSER}>{PayMethod.MK_SBSER}</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group controlId="formFile">
            <Form.Label>Прикрепите скриншот оплаты</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png"
              isInvalid={typeof errors.File !== "undefined" ? true : false}
              required
              {...register("File", {
                required: "Прикрепите скриншот об оплате",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.File !== "undefined" ? errors.File.message : null}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mt-2 d-grid gap-2 mt-2">
            <Button variant="dark" type="submit">
              Оформить заказ
            </Button>
            <Button
              variant="dark"
              onClick={() => prevStep(enumDeliveryState.Pay)}
            >
              Назад
            </Button>
          </div>
        </>
      ) : null}
    </Form>
  )
}

export default FinalForm
