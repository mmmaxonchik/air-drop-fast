import Cookies from "js-cookie"

const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export { getCookie }
