export enum CategoryId {
  Sneakers,
  Clothes,
  Accessories,
}

export interface Category {
  Id: CategoryId
  Name: "Кроссовки" | "Одежда" | "Аксессуары"
}
