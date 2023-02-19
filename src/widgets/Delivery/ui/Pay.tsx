import { useContext } from "react"
import Button from "react-bootstrap/Button"
import { DeliveryContext } from "./DeliveryForm"

function Pay() {
  const { setDeliveryState } = useContext(DeliveryContext)
  const prevStep = () => {
    setDeliveryState(2)
    document.documentElement.scrollTop = 0
  }
  return (
    <div>
      <h2>Выберете способ оплаты</h2>
      <div className="mt-2 d-grid gap-2 mt-2">
        <Button variant="dark" onClick={() => prevStep()}>
          Назад
        </Button>
      </div>
    </div>
  )
}

export default Pay
