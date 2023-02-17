export interface Reserve {
    id: number,
    cookId: number,
    menuId: number,
    numberOfPeople: number,
    date: Date,
    address: string,
    phoneNumber: number,
    comments: string,
    starters: ReserveDish[],
    mainDishes: ReserveDish[],
    desserts: ReserveDish[],
    state: ReservationState,
    prixTotal: number,
}

export enum ReservationState {
    SUBMITTED = "SUBMITTED" ,
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export interface ReservationToShow {
    id: number,
    name: string,
    menuName: string,
    numberOfPeople: number,
    date: Date,
    address: string,
    phoneNumber: number,
    comments: string,
    state: ReservationState,
    starters: ReserveDish[],
    mainDishes: ReserveDish[],
    desserts: ReserveDish[],
    prixTotal: number,
}

export interface ReserveDish {
    name: string;
    quantity: any;
    price: number;
}