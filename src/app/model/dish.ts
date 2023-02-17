export interface Dish {
    id: number,
    name: string,
    description: string,
    price: number,
    type: DishTypeEnum,
}

export enum DishTypeEnum {
    STARTER = "Starter" ,
    MAIN = "Main",
    DESSERT = "Dessert"
}