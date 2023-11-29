import { dataSource } from '../db/config'
import { Alternative } from '../db/entities/alternative'
import { AlternativesRepository } from './port/alternative-repository'

class AlternativeRepository implements AlternativesRepository {
  private readonly alternativeRepository
  constructor() {
    this.alternativeRepository = dataSource.getRepository(Alternative)
  }

  async findByExerciseId(exerciseId: string): Promise<Alternative[] | undefined> {

    const alternatives = await this.alternativeRepository.find({
      where: {
        exerciseId
      },
    })
    if (!alternatives) {
      return undefined
    }
    return alternatives
  }

}

export default AlternativeRepository