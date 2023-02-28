interface setSelectProps {
  Name: string
  ArrayAns: { Name: string; Id: number }[] | undefined
}

export const setSelect = ({ Name, ArrayAns }: setSelectProps): number => {
  let id = 0
  if (Array.isArray(ArrayAns)) {
    ArrayAns.forEach((element) => {
      if (element.Name === Name) {
        id = element.Id
      }
    })
  }
  return id
}
