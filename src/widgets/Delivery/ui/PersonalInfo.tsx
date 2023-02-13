import { useRef } from "react"
import { Input } from "../../../shared/InputUX"

function PersonalInfo() {
  const nameRef = useRef(null)
  const sureNameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const telegramRef = useRef(null)
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
    </div>
  )
}

export default PersonalInfo
