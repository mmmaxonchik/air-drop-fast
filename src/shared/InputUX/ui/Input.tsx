import React, { useState, useEffect } from "react"
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
  regex?: RegExp
  errorMessage?: string
  required?: boolean
  maxLength?: number
  minLength?: number
}

function Input({
  label,
  placeholder,
  state,
  inputRef,
  className,
  inputType,
  regex,
  errorMessage,
  required,
  maxLength,
  minLength,
}: IInputProps) {
  //Input Changes
  const [value, setValue] = useState<typeof state>(state)
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  //Input Blur
  const [dirty, setDirty] = useState<boolean>(false)
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setDirty(true)
  }

  //Regular Expressions
  const [regular, setRegular] = useState<boolean>(false)
  useEffect(() => {
    if (typeof regex === "object" && typeof value === "string") {
      setRegular(regex.test(value))
    }
  }, [value])
  const validRules = regex ? dirty && !regular : false
  return (
    <>
      <Form.Group className="mt-2">
        <FloatingLabel
          label={label}
          className={className ? className : undefined}
        >
          <Form.Control
            placeholder={placeholder ? placeholder : label}
            type={inputType}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            required={required}
            isInvalid={validRules}
            className={style.input}
            ref={inputRef}
            maxLength={maxLength}
            minLength={minLength}
          />

          <Form.Control.Feedback type="invalid">
            {errorMessage || "error"}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    </>
  )
}

export default Input
