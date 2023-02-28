import axios from "axios"
import { getCookie } from "../cookies/getCookie"

export const baseURL = "http://localhost:4000/api/"

const host = axios.create({
  baseURL,
})

const adminHost = axios.create({
  baseURL,
})

const adminInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${getCookie("Admin_Token")}`
  return config
}

adminHost.interceptors.request.use(adminInterceptor)

export { host, adminHost }
