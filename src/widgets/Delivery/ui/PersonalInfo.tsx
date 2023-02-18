import { useRef, useContext } from "react"
import { Button } from "react-bootstrap"
import { Input } from "../../../shared/InputUX"
import { DeliveryContext } from "./DeliveryForm"

function PersonalInfo() {
  const nameRef = useRef(null)
  const sureNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const telegramRef = useRef(null)
  const { setDeliveryState } = useContext(DeliveryContext)
  const prevStep = () => {
    setDeliveryState(0)
    document.documentElement.scrollTop = 0
  }

  const nextStep = () => {
    setDeliveryState(2)
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      <Input
        label="Имя"
        state={""}
        inputRef={nameRef}
        className="mt-2"
        inputType="text"
      ></Input>
      <Input
        label="Фамилия"
        state={""}
        inputRef={sureNameRef}
        className="mt-2"
        inputType="text"
      ></Input>
      <Input
        label="Почта"
        state={""}
        inputRef={emailRef}
        className="mt-2"
        inputType="email"
      ></Input>
      <Input
        label="Номер телефона"
        state={""}
        inputRef={phoneRef}
        className="mt-2"
        inputType="tel"
      ></Input>
      <Input
        label="Телеграм"
        state={""}
        inputRef={telegramRef}
        className="mt-2"
        inputType="text"
      ></Input>
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

export default PersonalInfo
