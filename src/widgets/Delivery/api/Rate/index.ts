import { host } from "../../../../app/api"
import { Rate } from "../../../../pages/OrderCreatePage/types"

export const getRates = async (): Promise<Rate[]> => {
  const { data } = await host.get("/rate")
  return data
}
