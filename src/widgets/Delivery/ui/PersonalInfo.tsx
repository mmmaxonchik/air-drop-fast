import { useRef, useContext } from "react"
import { Button } from "react-bootstrap"
import { Input } from "../../../shared/InputUX"
import { DeliveryContext } from "./DeliveryForm"

function PersonalInfo() {
  const nameRef = useRef<HTMLInputElement>(null)
  const sureNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const telegramRef = useRef<HTMLInputElement>(null)
  const { setDeliveryState } = useContext(DeliveryContext)
  const prevStep = () => {
    setDeliveryState(0)
    document.documentElement.scrollTop = 0
  }

  const nextStep = () => {
    const nameCondition =
      typeof nameRef.current?.value === "string" &&
      nameRef.current?.value.length > 0
    const sureNameCondition =
      typeof sureNameRef.current?.value === "string" &&
      sureNameRef.current?.value.length > 0
    const emailCondition =
      typeof emailRef.current?.value === "string" &&
      emailRef.current?.value.length > 0
    const phoneCondition =
      typeof phoneRef.current?.value === "string" &&
      phoneRef.current?.value.length > 0
    const telegramCondition =
      typeof telegramRef.current?.value === "string" &&
      telegramRef.current?.value.length > 0
    const nextFunc = () => {
      setDeliveryState(2)
      document.documentElement.scrollTop = 0
    }
    nameCondition &&
    sureNameCondition &&
    emailCondition &&
    phoneCondition &&
    telegramCondition
      ? nextFunc()
      : alert("Заполнены не все поля, или введены некорректные данные")
  }
  return (
    <div>
      <Input
        label="Имя"
        state={""}
        inputRef={nameRef}
        className="mt-2"
        inputType="text"
        maxLength={20}
        regex={/^.{1,}$/}
        errorMessage="Имя может иметь от 1 до 20 символов"
      ></Input>
      <Input
        label="Фамилия"
        state={""}
        inputRef={sureNameRef}
        className="mt-2"
        inputType="text"
        maxLength={20}
        regex={/^.{1,}$/}
        errorMessage="Фамилия может иметь от 1 до 20 символов"
      ></Input>
      <Input
        label="Почта"
        state={""}
        inputRef={emailRef}
        className="mt-2"
        inputType="email"
        regex={
          /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u
        }
        errorMessage="Почта может быть указана в формате example@email.com"
      ></Input>
      <Input
        label="Номер телефона"
        state={""}
        inputRef={phoneRef}
        className="mt-2"
        inputType="tel"
        regex={/(\+7|8)[\s(]*\d{3}[)\s]*\d{3}[\s-]?\d{2}[\s-]?\d{2}/g}
        errorMessage="Телефон может быть указана в формате +7 999 99 99"
      ></Input>
      <Input
        label="Телеграм"
        state={""}
        inputRef={telegramRef}
        className="mt-2"
        inputType="text"
        regex={/[@].{1,}$/}
        errorMessage="Телеграм может быть указан в формате @name"
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
