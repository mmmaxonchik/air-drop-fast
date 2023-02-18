import { useRef, useState, useContext } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { Input } from "../../../shared/InputUX"
import { SelectUX } from "../../../shared/SelectUX"
import style from "./delivery.module.scss"
import { DeliveryContext } from "./DeliveryForm"

enum enumWaysToReceive {
  delivery = "delivery",
  pickup = "pickup",
}

enum enumDeliveryWays {
  none,
  sdek,
  russian_post,
}

function DeliveryInfo() {
  //Метод выдачи
  const [deliveryMethod, setDeliveryMethod] = useState<enumWaysToReceive>(
    enumWaysToReceive.delivery
  )

  //Сервисы доставки
  const deliveryService = useRef<HTMLSelectElement>(null)
  const [deliveryWays, setDeliveryWays] = useState<enumDeliveryWays>(
    enumDeliveryWays.none
  )
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryWays(Number(e.target.value))
  }

  //Самовывоз
  const pointOfIssue = useRef<HTMLSelectElement>(null)

  //СДЭК
  const nearestPickupPoint = useRef<HTMLInputElement>(null)

  //Почта России
  const region = useRef<HTMLInputElement>(null)
  const city = useRef<HTMLInputElement>(null)
  const street = useRef<HTMLInputElement>(null)
  const houseNumber = useRef<HTMLInputElement>(null)
  const postIndex = useRef<HTMLInputElement>(null)

  const { setDeliveryState } = useContext(DeliveryContext)
  const prevStep = () => {
    setDeliveryState(1)
    document.documentElement.scrollTop = 0
  }

  const nextStep = () => {
    setDeliveryState(3)
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      <div className="d-grid gap-2 mt-2">
        <Button
          variant="dark"
          onClick={() => setDeliveryMethod(enumWaysToReceive.pickup)}
        >
          Самовывоз
        </Button>
      </div>
      <div className="d-grid gap-2 mt-2">
        <Button
          variant="dark"
          onClick={() => setDeliveryMethod(enumWaysToReceive.delivery)}
        >
          Доставка
        </Button>
      </div>
      {deliveryMethod === enumWaysToReceive.delivery ? (
        <>
          <FloatingLabel label="Сервис доставки" className="mt-2">
            <Form.Select
              ref={deliveryService}
              onChange={handleSelect}
              className={style.deliverySelect}
            >
              <option value="0">{"Выберете сервис доставки"}</option>
              <option value="1">{"Сдэк"}</option>
              <option value="2">{"Почта России"}</option>
            </Form.Select>
          </FloatingLabel>
          {deliveryWays === enumDeliveryWays.sdek ? (
            <Input
              label={"Ближайший пункт выдачи"}
              state={""}
              inputRef={nearestPickupPoint}
              className="mt-2"
            />
          ) : null}
          {deliveryWays === enumDeliveryWays.russian_post ? (
            <>
              <Input
                label={"Область"}
                state={""}
                inputRef={region}
                className="mt-2"
              />
              <Input
                label={"Город"}
                state={""}
                inputRef={city}
                className="mt-2"
              />
              <Input
                label={"Улица"}
                state={""}
                inputRef={street}
                className="mt-2"
              />
              <Input
                label={"Номер Дома/Строения"}
                state={""}
                inputRef={houseNumber}
                className="mt-2"
              />
              <Input
                label={"Почтовый индекс"}
                state={""}
                inputRef={postIndex}
                className="mt-2"
              />
            </>
          ) : null}
        </>
      ) : null}
      {deliveryMethod === enumWaysToReceive.pickup ? (
        <SelectUX
          label={"Пункт выдачи"}
          inputRef={pointOfIssue}
          options={[
            "Москва, метро Новаторская",
            "Москва, метро Рязанский Проспект",
          ]}
          firstOption="Выберете пункт выдачи"
          className="mt-2"
        />
      ) : null}
      <div className="mt-2 d-grid gap-2 mt-2">
        <Button variant="dark" onClick={() => nextStep()}>
          Продолжить
        </Button>
        <Button variant="dark" onClick={() => prevStep()}>
          Назад
        </Button>
      </div>
    </div>
  )
}

export default DeliveryInfo
