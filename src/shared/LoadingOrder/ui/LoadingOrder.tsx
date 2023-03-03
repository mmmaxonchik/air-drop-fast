import { Spinner } from "react-bootstrap"
import style from "./loading.module.scss"

function LoadingOrder() {
  return (
    <div className={style.loadingOrder}>
      <p>Идет создание заказа, пожалуйста подождите...</p>
      <Spinner animation="border" role="status" className={style.loading}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingOrder
