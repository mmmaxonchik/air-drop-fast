import Placeholder from "react-bootstrap/Placeholder"
import style from "./inputLoader.module.scss"
function InputLoader() {
  return (
    <div className="mt-2 d-grid gap-1">
      <Placeholder.Button
        size="lg"
        variant="secondary"
        animation="wave"
        className={style.inputLoader}
      />
    </div>
  )
}

export default InputLoader
