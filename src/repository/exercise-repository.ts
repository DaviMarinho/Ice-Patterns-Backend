import { dataSource } from '../db/config'
import { Exercise } from '../db/entities/exercise'
import { ExercisesRepository } from './port/exercise-repository'

class ExerciseRepository implements ExercisesRepository {
  private readonly exerciseRepository
  constructor() {
    this.exerciseRepository = dataSource.getRepository(Exercise)
  }

  async findBySublevelId(sublevelId: string): Promise<Exercise[] | undefined> {

    const exercises = await this.exerciseRepository.find({
      where: {
        sublevel: {id : sublevelId}
      },
    })
    if (!exercises) {
      return undefined
    }
    return exercises
  }

}

export default ExerciseRepository