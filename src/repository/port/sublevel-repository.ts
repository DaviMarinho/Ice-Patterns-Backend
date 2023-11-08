import { Sublevel } from '../../db/entities/domain/sublevel'

export interface SublevelsRepository {
    findOneByNumber(numSublevel: number): Promise<Sublevel | undefined>
}