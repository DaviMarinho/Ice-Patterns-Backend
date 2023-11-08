import { dataSource } from '../db/config'
import { Sublevel } from '../db/entities/sublevel'
import { SublevelsRepository } from './port/sublevel-repository'


class SublevelRepository implements SublevelsRepository {
  private readonly sublevelRepository
  constructor() {
    this.sublevelRepository = dataSource.getRepository(Sublevel)
  }

  async findOneByNumbers(numSublevel: number, numLevel: number): Promise<Sublevel | undefined> {
    const sublevel = await this.sublevelRepository.findOneBy({
        numSublevel,
        numLevel
      })
      if (!sublevel) {
        return undefined
      }
      return sublevel
  }

}

export default SublevelRepository