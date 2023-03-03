import { host } from "../../../../app/api"
import { Order } from "../../../../pages/OrderCreatePage/types"

export const createOrder = async (formData: Order): Promise<Order> => {
  const { data } = await host.post("/order", formData)
  return data
}
