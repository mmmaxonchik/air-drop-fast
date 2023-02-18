import React, { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import style from "./Select.module.scss"
interface SelectUXProps {
  label: string
  inputRef:
    | ((instance: HTMLSelectElement | null) => void)
    | React.RefObject<HTMLSelectElement>
    | null
    | undefined
  className?: string
  options: string[]
  firstOption?: string | number
}

function SelectUX({
  label,
  firstOption,
  inputRef,
  className,
  options,
}: SelectUXProps) {
  const [select, setSelect] = useState<string | null>(null)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
  }
  return (
    <FloatingLabel label={label} className={className ? className : undefined}>
      <Form.Select
        aria-label={label}
        ref={inputRef}
        className={style.select}
        onChange={handleSelect}
      >
        {firstOption ? <option>{firstOption}</option> : null}
        {options.map((value, index) => (
          <option key={index} value={index}>
            {value}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
}

export default SelectUX
