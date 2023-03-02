import { ChangeEvent, useState, useContext } from "react"
import { Form, FloatingLabel, Button, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { UseMutationResult, UseQueryResult } from "react-query"
import { Link } from "react-router-dom"
import { setSelect } from "../../../entities/setSelect"
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
import { CheckoutStatuses, Order } from "../../../pages/OrderCreatePage/types"
import { DeliveryTypeType } from "../../../pages/OrderCreatePage/types/DeliveryTypeType"
import { InputLoader } from "../../../shared/InputLoader"

interface FinalFormProps {
  step: CheckoutStatuses
  fetchDeliveryTypes: UseQueryResult<DeliveryTypeType[]>
  postNewOrder: UseMutationResult<any, unknown, Order, unknown>
}

interface IFormInputs {
  Name: string
  Surname: string
  Email: string
  PhoneNumber: string
  Telegram: string
  Comment: string
  DeliveryType: string
  Pickup: string
  Region: string
  City: string
  Street: string
  HouseNumber: string
  PostIndex: string
  DeliveryTypeId: number
}

const ModalInformation = (props: any) => {
  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Согласие на обработку персональных данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Согласие на обработку персональных данных</p>
        <p>
          Настоящим в соответствии с Федеральным законом № 152-ФЗ «О
          персональных данных» от 27.07.2006 года свободно, своей волей и в
          своем интересе выражаю свое безусловное согласие на обработку моих
          персональных данных ИП '' (ОГРНИП '', ИНН ''), зарегистрированным в
          соответствии с законодательством РФ по адресу: (далее по тексту -
          Оператор).
        </p>
        <p>
          1. Согласие дается на обработку одной, нескольких или всех категорий
          персональных данных, не являющихся специальными или биометрическими,
          предоставляемых мною, которые могут включать:
        </p>
        <ul>
          <li>- Имя Фамилия</li>
          <li>- Адрес доставки</li>
          <li>- Ссылка на Telegram</li>
          <li>- Телефон</li>
          <li>- E-Mail</li>
        </ul>
        <p>
          2. Оператор может совершать следующие действия: сбор; запись;
          систематизация; накопление; хранение; уточнение (обновление,
          изменение); извлечение; использование; блокирование; удаление;
          уничтожение.
        </p>
        <p>
          3. Способы обработки: как с использованием средств автоматизации, так
          и без их использования.
        </p>
        <p>
          4. Цель обработки: предоставление мне услуг/работ, включая,
          направление в мой адрес уведомлений, касающихся предоставляемых
          услуг/работ, подготовка и направление ответов на мои запросы,
          направление в мой адрес информации о
          мероприятиях/товарах/услугах/работах Оператора.
        </p>

        <p>
          5. Настоящее согласие действует до момента его отзыва путем
          направления соответствующего уведомления на электронный адрес '' или
          направления по адресу .
        </p>
        <p>
          6. В случае отзыва мною согласия на обработку персональных данных
          Оператор вправе продолжить обработку персональных данных без моего
          согласия при наличии оснований, предусмотренных Федеральным законом
          №152-ФЗ «О персональных данных» от 27.07.2006г.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="dark">
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function FinalForm({ step, fetchDeliveryTypes, postNewOrder }: FinalFormProps) {
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
  const [deliveryTypeNew, setDeliveryTypeNew] = useState<number>(0)
  const selectDeliveryTypeNew = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value)
    const eventNumber = isNaN(id)
    eventNumber ? setDeliveryTypeNew(0) : setDeliveryTypeNew(id)
    if (russia_post === id || sdek === id) {
      setValue("Pickup", "")
    }
    if (pickup === id) {
      setValue("Region", "")
      setValue("City", "")
      setValue("Street", "")
      setValue("HouseNumber", "")
      setValue("PostIndex", "")
    }
  }
  const pickup = setSelect({
    Name: "Самовывоз",
    ArrayAns: fetchDeliveryTypes.data,
  })
  const russia_post = setSelect({
    Name: "Почта России",
    ArrayAns: fetchDeliveryTypes.data,
  })
  const sdek = setSelect({ Name: "СДЭК", ArrayAns: fetchDeliveryTypes.data })

  //Steps
  const nextStep = (id: number) => {
    setCheckoutStatus(id)
  }
  const prevStep = (id: number) => {
    setCheckoutStatus(id - 1)
  }

  //Confirmation
  const [confirmation, setConfirmation] = useState<boolean>(false)
  const [modalInfoShow, setModalInfoShow] = useState(false)

  //API
  const { cart, setCheckoutStatus } = useContext(OrderCreateContext)

  const createOrderApi = async (data: IFormInputs) => {
    const { Name, Surname, PhoneNumber, Email, Telegram, Comment } = data
    const { DeliveryTypeId } = data
    const { Pickup, Region, City, Street, HouseNumber, PostIndex } = data
    const Address = {
      Pickup,
      Region,
      City,
      Street,
      HouseNumber,
      PostIndex,
    }
    const newOrder: Order = {
      Name,
      Surname,
      PhoneNumber,
      Email,
      Telegram,
      Comment,
      DeliveryTypeId,
      Address,
      Items: cart,
    }
    try {
      postNewOrder.mutate(newOrder)
    } catch (e) {
      console.log(e)
    }
  }

  //Submit
  const onSubmit = (data: IFormInputs) => {
    if (step === CheckoutStatuses.PersonalInfo) {
      nextStep(CheckoutStatuses.PersonalInfo + 1)
    }
    if (step === CheckoutStatuses.DeliveryInfo) {
      if (deliveryTypeNew === russia_post || deliveryTypeNew === sdek) {
        const validation =
          data.Region.length > 0 && cart.length > 0 && confirmation
        validation ? createOrderApi(data) : alert("Укажите все данные")
      }
      if (deliveryTypeNew === pickup) {
        const validation =
          data.Pickup.length > 0 && cart.length > 0 && confirmation
        validation ? createOrderApi(data) : alert("Укажите все данные")
      }
      if (deliveryTypeNew === 0) {
        alert("Выберете способ получения.")
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {step === CheckoutStatuses.PersonalInfo ? (
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
              onClick={() => prevStep(CheckoutStatuses.PersonalInfo)}
            >
              Назад
            </Button>
          </div>
        </>
      ) : null}
      {step === CheckoutStatuses.DeliveryInfo ? (
        <>
          {fetchDeliveryTypes.isLoading ? (
            <InputLoader />
          ) : (
            <FloatingLabel label={"Способы получения"} className={"mt-2"}>
              <Form.Select
                aria-label={"Способы получения"}
                defaultValue={0}
                {...register("DeliveryTypeId")}
                onChange={selectDeliveryTypeNew}
              >
                <option value={0}>{"Выберете способ получения"}</option>
                {fetchDeliveryTypes.data?.map(({ Name, Id }) => (
                  <option value={Id} key={Id}>
                    {Name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          )}

          {deliveryTypeNew === pickup ? (
            <FloatingLabel label={"Пункты выдачи"} className={"mt-2"}>
              <Form.Select aria-label={"Пункты выдачи"} {...register("Pickup")}>
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

          {deliveryTypeNew !== pickup && deliveryTypeNew !== 0 ? (
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
                      typeof errors.HouseNumber !== "undefined" ? true : false
                    }
                    required
                    {...register("HouseNumber", {
                      maxLength: {
                        value: 100,
                        message: "Номер дома может иметь от 1 до 100 символов",
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
              {deliveryTypeNew === russia_post ? (
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
              ) : null}
            </>
          ) : null}

          <Form.Group className="mt-3">
            <Form.Label>Пожелания к заказу</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              maxLength={254}
              placeholder="Если у вас есть пожелания к заказу, напишите их здесь."
              {...register("Comment", { maxLength: 254 })}
            />
          </Form.Group>

          <Form.Check
            className="mt-2"
            type="checkbox"
            label={
              <Link to="" onClick={() => setModalInfoShow(true)}>
                Нажимая кнопку «Оформить заказ», я даю свое согласие на
                обработку моих персональных данных, в соответствии с Федеральным
                законом от 27.07.2006 года №152-ФЗ «О персональных данных», на
                условиях и для целей, определенных в Согласии на обработку
                персональных данных.
              </Link>
            }
            onChange={() => setConfirmation(!confirmation)}
            checked={confirmation}
          />
          <ModalInformation
            show={modalInfoShow}
            onHide={() => setModalInfoShow(false)}
          />

          <div className="mt-2 d-grid gap-2 mt-2">
            <Button variant="dark" type="submit">
              Оформить заказ
            </Button>
            <Button
              variant="dark"
              onClick={() => prevStep(CheckoutStatuses.DeliveryInfo)}
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
