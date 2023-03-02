import { memo } from "react"
import { Card, Placeholder } from "react-bootstrap"
import { UseMutationResult } from "react-query"
import {
  TrackDataType,
  TrackOrderType,
} from "../../../pages/TrackPage/api/Order"
import style from "./track.module.scss"

interface TrackCardProps {
  postTrackData: UseMutationResult<
    TrackOrderType,
    unknown,
    TrackDataType,
    unknown
  >
}

const LoadingTrackCard = memo(() => {
  return (
    <Card className={style.trackCardLoader}>
      <Card.Title>
        <Placeholder as="h2" animation="wave" className={style.title}>
          <Placeholder xs={8} />
        </Placeholder>
      </Card.Title>
      <Card.Subtitle>
        <Placeholder as="p" animation="wave" className={style.subtitle}>
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Subtitle>
      <Card.Text>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
      </Card.Text>
      <Card.Subtitle>
        <Placeholder />
      </Card.Subtitle>
      <Card.Text className={style.info}></Card.Text>
    </Card>
  )
})

const ErrorCard = memo(() => {
  return (
    <Card className={style.trackCard}>
      {"Заказ не найден, обратитесь в службу поддержи."}
    </Card>
  )
})

function TrackCard({ postTrackData }: TrackCardProps) {
  return (
    <>
      {postTrackData.isLoading ? (
        <LoadingTrackCard />
      ) : (
        <>
          {postTrackData.isError ? (
            <ErrorCard />
          ) : (
            <Card className={style.trackCard}>
              <Card.Title>{postTrackData.data?.OrderNumber}</Card.Title>
              <Card.Subtitle>{"Данные получателя:"}</Card.Subtitle>
              <Card.Text className={style.info}>
                <p>{`Имя: ${postTrackData.data?.Name}`}</p>
                <p>{`Фамилия: ${postTrackData.data?.Surname}`}</p>
                <p>{`Номер телефона: ${postTrackData.data?.PhoneNumber}`}</p>
                <p>{`Почта: ${postTrackData.data?.Email}`}</p>
                <p>{`Почта: ${postTrackData.data?.Telegram}`}</p>
              </Card.Text>
              <Card.Subtitle>{"Адрес доставки:"}</Card.Subtitle>
              <Card.Text className={style.info}>
                {postTrackData.data?.Address.Pickup ? (
                  <p>{`Самовывоз: ${postTrackData.data?.Address.Pickup}`}</p>
                ) : (
                  <>
                    <p>{`Регион: ${postTrackData.data?.Address.Region}, город: ${postTrackData.data?.Address.City}, улица: ${postTrackData.data?.Address.Street}, дом: ${postTrackData.data?.Address.HouseNumber}, индекс: ${postTrackData.data?.Address.PostIndex}`}</p>
                  </>
                )}
              </Card.Text>
              <Card.Subtitle>{"Состав заказа:"}</Card.Subtitle>
              {postTrackData.data?.Items.map(
                (
                  { ItemName, Article, Link, Count, Size, Price, ActualRate },
                  index
                ) => (
                  <Card.Text key={index} className={style.info}>
                    <p>{`Название: ${ItemName}`}</p>
                    <p>{`Артикул: ${Article}`}</p>
                    <p>{`Ссылка: ${Link}`}</p>
                    <p>{`Количество: ${Count}`}</p>
                    <p>{`Размер: ${Size}`}</p>
                    <p>{`${Number(Price) * Number(ActualRate)}₽`}</p>
                  </Card.Text>
                )
              )}
            </Card>
          )}
        </>
      )}
    </>
  )
}

export default TrackCard
