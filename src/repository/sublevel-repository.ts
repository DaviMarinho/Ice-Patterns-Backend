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

  async findOneById(id: string): Promise<Sublevel | undefined> {

    const sublevel = await this.sublevelRepository.findOneBy({
        id
      })
      if (!sublevel) {
        return undefined
      }
      return sublevel
  }

  async findByLevelId(id: number): Promise<Sublevel[] | undefined> {

    const sublevels = await this.sublevelRepository.find({
      where: {
        numLevel: id,
      },
      })
      if (!sublevels) {
        return undefined
      }
      return sublevels
  }
}

export default SublevelRepository