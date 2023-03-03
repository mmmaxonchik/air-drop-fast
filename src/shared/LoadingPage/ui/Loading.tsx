import { Spinner } from "react-bootstrap"
import style from "./loading.module.scss"

function Loading() {
  return (
    <div className={style.loadingPage}>
      <Spinner animation="border" role="status" className={style.loading}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading
