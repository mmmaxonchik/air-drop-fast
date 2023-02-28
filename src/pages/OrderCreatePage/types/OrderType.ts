export interface Item {
  ItemName: string
  Article: string
  Link?: string
  Count: number
  Size: string
  Price: number
  CategoryId: number
  MarketplaceId: number
  RateId: number
  id?: number
}

interface Address {
  [AddressElement: string]: string
}

export interface Order {
  Name: string
  Surname: string
  Email: string
  PhoneNumber: string
  Telegram: string
  Comment?: string
  DeliveryTypeId: number
  Items: Item[]
  Address: Address
  OrderNumber?: string
}
