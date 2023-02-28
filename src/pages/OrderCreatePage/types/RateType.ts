enum RateName {
  "¥" = "¥",
  "$" = "$",
  "€" = "€",
}

export interface Rate {
  Id: number
  Name: RateName
  Price: number
}
