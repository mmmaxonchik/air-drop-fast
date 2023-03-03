import style from "./errorOrder.module.scss"

function ErrorOrder() {
  return (
    <div className={style.errorOrder}>
      <p>Произошла неизвестная ошибка, попробуйте позже</p>
    </div>
  )
}

export default ErrorOrder
