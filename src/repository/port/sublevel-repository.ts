import { Sublevel } from '../../db/entities/sublevel'

export interface SublevelsRepository {
    findOneByNumbers(numSublevel: number, numLevel: number): Promise<Sublevel | undefined>
    findOneById(id: string): Promise<Sublevel | undefined>
    findByLevelId(id: number): Promise<Sublevel[] | undefined>
}