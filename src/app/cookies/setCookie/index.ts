import Cookies from "js-cookie"

const setCookie = (name: string, value: string): void => {
  Cookies.set(name, value, {
    path: "/",
    expires: 2,
  })
}

export { setCookie }
