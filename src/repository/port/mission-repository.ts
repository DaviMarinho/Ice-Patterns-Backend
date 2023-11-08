import { Mission } from '../../db/entities/mission'

export interface MissionsRepository {
    findOneById(id: string): Promise<Mission | undefined>
    findByUnlockingLevel(sublevelId: string): Promise<Mission[] | undefined>
}