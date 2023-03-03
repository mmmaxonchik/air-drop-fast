import { useContext } from "react"
//Ui
import FinalForm from "./FinalForm"
//Api
import {
  createOrder,
  getDeliveryTypes,
} from "../../../pages/OrderCreatePage/api"
//Context
import { OrderCreateContext } from "../../../pages/OrderCreatePage/lib/orderCreate.context"
//Type
import { CheckoutStatuses } from "../../../pages/OrderCreatePage/types"
import { useQuery, useMutation } from "react-query"
import { LoadingOrder } from "../../../shared/LoadingOrder"
import { ErrorOrder } from "../../../shared/ErrorOrder"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function DeliveryForm() {
  //API
  const fetchDeliveryTypes = useQuery("deliveryTypes", getDeliveryTypes)
  const postNewOrder = useMutation(createOrder)
  const { checkoutStatus, setCheckoutStatus } = useContext(OrderCreateContext)
  return (
    <>
      {checkoutStatus !== CheckoutStatuses.Order && postNewOrder.isIdle ? (
        <FinalForm
          step={checkoutStatus}
          fetchDeliveryTypes={fetchDeliveryTypes}
          postNewOrder={postNewOrder}
        />
      ) : null}
      {postNewOrder.isLoading ? <LoadingOrder /> : null}
      {postNewOrder.isSuccess ? (
        <Card style={{ padding: 10 }}>
          <div
            style={{
              alignItems: "center",
              margin: "0 auto",
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Card.Title>{"Заказ оформлен!"}</Card.Title>
            <Card.Subtitle>{`Номер заказа: ${postNewOrder.data.OrderNumber}`}</Card.Subtitle>
            <Card.Text style={{ marginTop: 20 }}>
              {
                "В ближайшее время вам на почту придут реквизиты для оплаты, вам необходимо оплатить заказ в течение 30 минут, в противном случае заказ будет отменен. Для отслеживания заказа вы можете воспользоваться разделом "
              }
              <Link to={"/track"}>"Отследить заказ"</Link>
            </Card.Text>
          </div>

          <Card.Subtitle>Данные получателя:</Card.Subtitle>
          <Card.Text className="m-0">{`Имя: ${postNewOrder.data.Name}`}</Card.Text>
          <Card.Text className="m-0">{`Фамилия: ${postNewOrder.data.Surname}`}</Card.Text>
          <Card.Text className="m-0">{`Почта: ${postNewOrder.data.Email}`}</Card.Text>
          <Card.Text className="m-0">{`Номер телефона: ${postNewOrder.data.PhoneNumber}`}</Card.Text>
          <Card.Text className="m-0">{`Телеграм: ${postNewOrder.data.PhoneNumber}`}</Card.Text>
          <br></br>
          <Card.Subtitle>Адрес доставки:</Card.Subtitle>
          {postNewOrder.data.Address.Pickup ? (
            <>
              <Card.Text className="m-0">{`Самовывоз: ${postNewOrder.data.Address.Pickup}`}</Card.Text>
            </>
          ) : (
            <>
              <Card.Text className="m-0">{`${postNewOrder.data.Address.PostIndex}, ${postNewOrder.data.Address.Region}, Город: ${postNewOrder.data.Address.City}, Улица: ${postNewOrder.data.Address.Street}, Номер дома/строения: ${postNewOrder.data.Address.Street}`}</Card.Text>
            </>
          )}
          <br></br>
          <Card.Subtitle>Пожелание к заказу: </Card.Subtitle>
          <Card.Text className="m-0">{postNewOrder.data.Comment}</Card.Text>
          <br></br>
          <Card.Subtitle>Состав заказа: </Card.Subtitle>
          {postNewOrder.data.Items.map(
            ({ ItemName, Article, Size, Price, Count }, index) => (
              <div key={index}>
                <Card.Text className="m-0">{`Название: ${ItemName}`}</Card.Text>
                <Card.Text className="m-0">{`Артикул: ${Article}`}</Card.Text>
                <Card.Text className="m-0">{`Размер: ${Size}`}</Card.Text>
                <Card.Text className="m-0">{`Цена: ${Price}`}</Card.Text>
                <Card.Text className="m-0">{`Количество: ${Count}`}</Card.Text>
                <br></br>
              </div>
            )
          )}
          <Button
            variant="dark"
            className="m-2"
            onClick={() => setCheckoutStatus(CheckoutStatuses.Order)}
          >
            Вернутся назад
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="track">Отследить заказ</Link>
          </div>
        </Card>
      ) : null}
      {postNewOrder.isError ? <ErrorOrder /> : null}
    </>
  )
}

export default DeliveryForm
