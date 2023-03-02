import { host } from "../../../../app/api"

interface TrackAddress {
  Pickup: string
  Region: string
  City: string
  Street: string
  HouseNumber: string
  PostIndex: string
}
export interface TrackItem {
  ItemName: string
  Article: string
  Link: string
  Count: number
  Size: string
  Price: number
  ActualRate: number
  createdAt: Date
  updatedAt: Date
  CategoryId: number
  RateId: number
  MarketplaceId: number
}
export interface TrackOrderType {
  Name: string
  Surname: string
  Email: string
  PhoneNumber: string
  Telegram: string
  OrderNumber: string
  Items: TrackItem[]
  Address: TrackAddress
  StatusId: number
  DeliveryTypeId: number
  Comment: string
  createdAt: string
}

export interface TrackDataType {
  Name: string
  Surname: string
  OrderNumber: string
}

export const getTrackData = async (TrackData: TrackDataType) => {
  const { data } = await host.post("/order/get", TrackData)
  return data
}
