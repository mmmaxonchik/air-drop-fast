import React, { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import style from "./Input.module.scss"

interface IInputProps {
  label: string
  placeholder?: string
  state: string | number | string[] | undefined
  inputRef:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined
  className?: string
  inputType?: React.HTMLInputTypeAttribute
}

function Input({
  label,
  placeholder,
  state,
  inputRef,
  className,
  inputType,
}: IInputProps) {
  const [value, setValue] = useState<typeof state | undefined>(state)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <FloatingLabel label={label} className={className ? className : undefined}>
      <Form.Control
        placeholder={placeholder ? placeholder : label}
        type={inputType}
        value={value}
        onChange={handleChange}
        ref={inputRef}
        className={style.input}
      />
    </FloatingLabel>
  )
}

export default Input
