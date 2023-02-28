import { host } from "../../../../app/api"
import { Marketplace } from "../../../../pages/OrderCreatePage/types"

export const getMarketplace = async (): Promise<Marketplace[]> => {
  const { data } = await host.get("/marketplace")
  return data
}
