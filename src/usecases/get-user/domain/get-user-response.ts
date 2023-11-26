import { Sublevel } from "../../../db/entities/sublevel"

export interface GetUserResponse {
    username: string
    name: string
    email: string
    password: string
    qtBooster: number
    qtEnergy: number
    qtCube: number
    qtXpOnLevel: number
    qtXpTotal: number
    sublevel: Sublevel
    boosterActive: boolean
    boosterActiveDateTime?: Date,
    boosterDeactiveDateTime?: Date
    createdAt?: Date
    updatedAt?: Date
}
