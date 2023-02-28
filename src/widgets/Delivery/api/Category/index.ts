import { host } from "../../../../app/api"
import { Category } from "../../../../pages/OrderCreatePage/types"

export const getCategory = async (): Promise<Category[]> => {
  const { data } = await host.get("/category")
  return data
}
