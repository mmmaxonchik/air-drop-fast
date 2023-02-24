import style from "./track.module.scss"
import { useForm } from "react-hook-form"
import { FloatingLabel, Form, Card, Button } from "react-bootstrap"

interface IFormInputs {
  Name: string
  SecondName: string
  PhoneNumber: string
}

function TrackForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Card className={style.trackForm}>
      <h2>Отследить заказ</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mt-2">
          <FloatingLabel label={"Имя"}>
            <Form.Control
              type="text"
              placeholder="Имя"
              maxLength={80}
              isInvalid={typeof errors.Name !== "undefined" ? true : false}
              required
              {...register("Name", {
                maxLength: {
                  value: 80,
                  message: "Имя может содержать от 1 до 80 символов",
                },
                required: "Укажите имя",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.Name !== "undefined" ? errors.Name.message : null}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-2">
          <FloatingLabel label={"Фамилия"}>
            <Form.Control
              type="text"
              placeholder="Фамилия"
              maxLength={80}
              isInvalid={
                typeof errors.SecondName !== "undefined" ? true : false
              }
              required
              {...register("SecondName", {
                maxLength: {
                  value: 80,
                  message: "Фамилия может содержать от 1 до 80 символов",
                },
                required: "Укажите фамилию",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {typeof errors.SecondName !== "undefined"
                ? errors.SecondName.message
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
        <div className="mt-2 d-grid gap-2">
          <Button variant="dark" type="submit">
            Найти заказ
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default TrackForm
