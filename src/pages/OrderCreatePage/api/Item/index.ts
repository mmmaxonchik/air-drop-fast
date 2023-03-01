import { host } from "../../../../app/api"
import { Item } from "../../types"

export interface finalPrice {
  FinalPrice: number
}

export const getFinalPrice = async (Items: Item[]): Promise<finalPrice> => {
  const { data } = await host.post("/item", { Items: Items })
  return data
}
