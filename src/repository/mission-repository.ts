import { dataSource } from '../db/config'
import { Mission } from '../db/entities/mission'
import { MissionsRepository } from './port/mission-repository'


class MissionRepository implements MissionsRepository {
  private readonly missionRepository
  constructor() {
    this.missionRepository = dataSource.getRepository(Mission)
  }

  async findOneById(id: string): Promise<Mission | undefined> {

    const mission = await this.missionRepository.findOneBy({
        id
      })
      if (!mission) {
        return undefined
      }
      return mission
  }

  async findByUnlockingLevel(sublevelId: string): Promise<Mission[] | undefined> {

    const missions = await this.missionRepository.findBy({
        unlocksOnLevel: sublevelId
      })
      if (!missions) {
        return undefined
      }
      return missions
  }

}

export default MissionRepository