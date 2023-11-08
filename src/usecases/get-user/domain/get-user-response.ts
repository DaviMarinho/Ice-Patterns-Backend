import { Sublevel } from "../../../db/entities/domain/sublevel"

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
    createdAt?: Date
    updatedAt?: Date
}
