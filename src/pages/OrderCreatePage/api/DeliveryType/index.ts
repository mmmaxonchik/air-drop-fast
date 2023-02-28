import { host } from "../../../../app/api"
import { DeliveryTypeType } from "../../../../pages/OrderCreatePage/types/DeliveryTypeType"

export const getDeliveryTypes = async (): Promise<DeliveryTypeType[]> => {
  const { data } = await host.get("/deliveryType")
  return data
}
