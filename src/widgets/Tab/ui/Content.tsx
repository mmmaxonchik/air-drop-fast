import { Col } from "react-bootstrap"
import Tab from "react-bootstrap/Tab"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import style from "./tab.module.scss"
import { InfoTabsEnum } from "./Tab"

const AboutUs = () => {
  return (
    <Accordion defaultActiveKey="0" className={style.accordion}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Чем мы занимаемся?</Accordion.Header>
        <Accordion.Body>
          Наш сервис предоставляет услуги доставки и выкупом вещей из Китая. С
          помощью нас вы можете сделать заказ в Китае с таких площадок как
          Poizon, Nice, 95, Taobao и др. Мы предоставляем Авиатранспортный вид
          доставки на данный момент это является самый быстрый и безопасный
          способ доставки . Мы старается предоставить вам самые быстрые сроки
          доставки, а так же приятный вам курс. Cо временем сервис будет
          усовершенствован с целью более удобного и быстрого оформления заказа.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Почему именно мы?</Accordion.Header>
        <Accordion.Body>
          Мы старается предоставить вам самые быстрые сроки доставки, а так же
          приятный вам курс. Cо временем сервис будет усовершенствован с целью
          более удобного и быстрого оформления заказа.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

const AboutUs1 = () => {
  return (
    <div>
      <h1>О нас</h1>
      <h5>Самовывоз</h5>
      <p>
        Наш сервис предоставляет услуги доставки и выкупом вещей из Китая. С
        помощью нас вы можете сделать заказ в Китае с таких площадок как Poizon,
        Nice, 95, Taobao и др. Мы предоставляем Авиатранспортный вид доставки на
        данный момент это является самый быстрый и безопасный способ доставки .
        Мы старается предоставить вам самые быстрые сроки доставки, а так же
        приятный вам курс. Cо временем сервис будет усовершенствован с целью
        более удобного и быстрого оформления заказа.
      </p>
      <h5>Почему именно мы?</h5>
      <p>
        Мы старается предоставить вам самые быстрые сроки доставки, а так же
        приятный вам курс. Cо временем сервис будет усовершенствован с целью
        более удобного и быстрого оформления заказа.
      </p>
    </div>
  )
}

const Contacts = () => {
  return (
    <div>
      <h1>Контакты</h1>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>Поддержка</Card.Title>
          <Card.Text>
            Если у вас возникли проблемы вы всегда можете обратиться к нам в
            Телеграм или написав нам на почту.
          </Card.Text>
          <Card.Link href="https://t.me/AirDrop_Support1">Telegram</Card.Link>
          <Card.Link href="#">Gmail</Card.Link>
        </Card.Body>
      </Card>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>Крылов Михаил</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Менеджер</Card.Subtitle>
          <Card.Link href="https://t.me/K_Mihael">Telegram</Card.Link>
          <Card.Link href="https://vk.com/mkrylov1">Vk</Card.Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Спицын Максим</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Администратор
          </Card.Subtitle>
          <Card.Link href="https://t.me/AirDrop_Support1">Telegram</Card.Link>
          <Card.Link href="#">Vk</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

const Feedback = () => {
  return (
    <div>
      <h1>Отзывы</h1>
    </div>
  )
}

const Delivery = () => {
  return (
    <div>
      <h1>Доставка</h1>
      <h5>Самовывоз</h5>
      <p>
        На данный момент работают два пункта выдачи заказов - м.Рязанский
        Проспект/м.Новаторская (Заказ вы можете забрать предварительно
        связавшись с менеджером и согласовав время).
      </p>
      <h5>Доставка по Москве</h5>
      <p>Яндекс доставка обговаривается с менеджером.</p>
      <h5>Доставка по России</h5>
      <p>
        Доставка по России осуществляется от 2 дней, в зависимости от вашего
        города. После отправки товара, менеджер свяжется с вами и пришлёт вам
        трек-номер.
      </p>
    </div>
  )
}

const Pay = () => {
  return (
    <div>
      <h1>Оплата</h1>
      <h5>Банковский перевод</h5>
      <p>
        Мы принимаем оплату по банковским картам систем Visa, MasterCard, МИР.
      </p>
    </div>
  )
}

const Instruction = () => {
  return (
    <Accordion defaultActiveKey="0" className={style.accordion}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Poizon</Accordion.Header>
        <Accordion.Body>
          <p>
            1. Устанавливаем приложение Poizon
            <a href="https://apps.apple.com/HK/app/id1509915974?mt=8"> IOS</a>/
            <a href="https://www.poizon.com/">Android</a>.
          </p>
          <hr></hr>
          <p>
            2. Заходим в приложение и в строке поиска пишем артикул или название
            вещи,нажимаем кнопку поиска. Находим и нажимаем на нужную пару.
          </p>
          <img alt="Info1" style={{ height: "calc(100vh/2)" }}></img>
          <img alt="Info2" style={{ height: "calc(100vh/2)" }}></img>
          <img alt="Info3" style={{ height: "calc(100vh/2)" }}></img>
          <hr></hr>
          <p>3. Нажимаем на нижнюю кнопку(Выбор размера)</p>
          <img alt="Info4" style={{ height: "calc(100vh/2)" }}></img>
          <hr></hr>
          <p>
            4. Выбираем кнопку для заказа *Бирюзовая кнопка (2-6 дней доставка
            до склада в Китае) *Черная кнопка (5-14 дней доставка до склада в
            Китае) *Серая кнопка (Б/у вещи)
          </p>
          <img alt="Info5" style={{ height: "calc(100vh/2)" }}></img>
          <hr></hr>

          <p>5. Как на фото ищем артикул товара и указываем его. </p>
          <img alt="Info6" style={{ height: "calc(100vh/2)" }}></img>
          <hr></hr>

          <p>
            6. Указываем всё в заказе и вам выдаётся стоимость товара (включая
            доставку), если вас все устраивает, то оплачиваете ваш заказ.
            Остальное остается за нами.
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export function Content() {
  return (
    <Col sm={9}>
      <Tab.Content>
        <Tab.Pane eventKey={InfoTabsEnum.aboutUs}>
          <AboutUs1 />
        </Tab.Pane>
        <Tab.Pane eventKey={InfoTabsEnum.contacts}>
          <Contacts />
        </Tab.Pane>
        <Tab.Pane eventKey={InfoTabsEnum.feedback}>
          <Feedback />
        </Tab.Pane>
        <Tab.Pane eventKey={InfoTabsEnum.delivery}>
          <Delivery />
        </Tab.Pane>
        <Tab.Pane eventKey={InfoTabsEnum.pay}>
          <Pay />
        </Tab.Pane>
        <Tab.Pane eventKey={InfoTabsEnum.instruction}>
          <Instruction />
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}
