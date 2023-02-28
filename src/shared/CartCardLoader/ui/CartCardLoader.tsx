import Placeholder from "react-bootstrap/Placeholder"
import style from "./cartCardLoader.module.scss"

function CartCardLoader() {
  return (
    <div className="mt-2 d-grid gap-1">
      <Placeholder.Button
        size="lg"
        variant="secondary"
        animation="wave"
        className={style.cardLoader}
      />
    </div>
  )
}

export default CartCardLoader
