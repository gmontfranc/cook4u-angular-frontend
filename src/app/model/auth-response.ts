export interface AuthResponse {
    email: string,
    token: string,
    firstName: string

}

export function isAuthResponse(object: any): object is AuthResponse {
    return 'email' in object && 'token' in object && 'firstName' in object;
}
