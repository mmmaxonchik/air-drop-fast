import { host } from "../../../../app/api"
import { Category } from "../../types"

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await host.get("/category")
  return data
}
