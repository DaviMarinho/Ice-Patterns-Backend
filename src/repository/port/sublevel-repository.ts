import { Sublevel } from '../../db/entities/domain/sublevel'

export interface SublevelsRepository {
    findOneByNumbers(numSublevel: number, numLevel: number): Promise<Sublevel | undefined>
}