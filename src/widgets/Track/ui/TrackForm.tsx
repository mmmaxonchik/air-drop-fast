import style from "./track.module.scss"
import { useForm } from "react-hook-form"
import { FloatingLabel, Form, Card, Button } from "react-bootstrap"
import TrackCard from "./TrackCard"
import { useMutation } from "react-query"
import { getTrackData, TrackDataType } from "../../../pages/TrackPage/api/Order"

interface IFormInputs {
  Name: string
  Surname: string
  OrderNumber: string
}

function TrackForm() {
  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onChange",
  })

  //api
  const postTrackData = useMutation(getTrackData)

  //submit
  const onSubmit = (data: TrackDataType) => {
    postTrackData.mutate(data)
  }
  return (
    <>
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
                maxLength={80}
                isInvalid={typeof errors.Surname !== "undefined" ? true : false}
                required
                {...register("Surname", {
                  maxLength: {
                    value: 80,
                    message: "Фамилия может содержать от 1 до 80 символов",
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
            <FloatingLabel label={"Номер заказа"}>
              <Form.Control
                inputMode="tel"
                type="tel"
                placeholder="Номер заказа"
                isInvalid={
                  typeof errors.OrderNumber !== "undefined" ? true : false
                }
                required
                {...register("OrderNumber", {
                  pattern: {
                    value: /.[ADL].[0-9]{0,13}.[-].[a-zA-ZА-Яа-я]/g,
                    message:
                      "Введите номер заказа в формате ADL*************-**",
                  },
                  required: "Укажите номер заказа",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.OrderNumber !== "undefined"
                  ? errors.OrderNumber.message
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
      {postTrackData.isIdle ? null : (
        <TrackCard postTrackData={postTrackData} />
      )}
    </>
  )
}

export default TrackForm
