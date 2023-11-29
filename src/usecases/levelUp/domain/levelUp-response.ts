import { Mission } from "../../../db/entities/mission"

export interface LevelUpResponse {
    username: string
    name: string
    email: string
    qtXpOnLevel: number
    qtXpTotal: number
    idSublevel: string
    numSublevel: number
    numLevel: number,
    missionsUnlocked?: Mission[]
}
