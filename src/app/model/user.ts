export interface User {
    id : number,
    email : string,
    name: string,
    description: string,
    age: number
}

export function isUser(object: any): object is User {
    return 'id' in object && 'email' in object && 'name' in object && 'description' in object && 'age' in object;
}