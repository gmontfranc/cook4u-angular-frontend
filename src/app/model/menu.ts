import { Dish } from "./dish";

export interface Menu {
    id: number,
    name: string,
    description: string,
    dishes: Dish[],
}
