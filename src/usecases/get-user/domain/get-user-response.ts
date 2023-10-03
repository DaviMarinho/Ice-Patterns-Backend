export interface GetUserResponse {
    username: string
    name: string
    email: string
    password: string
    qtBooster: number
    qtEnergy: number
    qtCube: number
    createdAt?: Date
    updatedAt?: Date
}
