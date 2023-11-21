import { UpdateResult } from 'typeorm'
import { dataSource } from '../db/config'
import { UserExercise } from '../db/entities/userExercise'
import { UserExercisesRepository } from './port/userExercise-repository'


class UserExerciseRepository implements UserExercisesRepository {
  private readonly userExerciseRepository
  constructor() {
    this.userExerciseRepository = dataSource.getRepository(UserExercise)
  }

  async createUserExercise(userUsername: string, exerciseId: string, dateTime: Date, qtAttempts: number, qtRights: number): Promise<UserExercise | undefined> {

    const userExercise = this.userExerciseRepository.create({
      userUsername,
      exerciseId,
      dateTime,
      qtAttempts,
      qtRights
    })

    await this.userExerciseRepository.save(userExercise)
    return userExercise
  }

  async updateUserExercise(userUsername: string, exerciseId: string, dateTime: Date, qtAttempts: number, qtRights: number): Promise<UpdateResult | undefined> {
    
    const userExercise = {
        "userUsername": userUsername,
        "exerciseId": exerciseId,
        "dateTime": dateTime,
        "qtAttempts": qtAttempts,
        "qtRights": qtRights,
    }
    const result = await this.userExerciseRepository
        // .createQueryBuilder()
        // .update(UserExercise)
        // .set(userExercise)
        // .where(`userExercise.userUsername = ${userUsername}`)
        // .andWhere(`userExercise.exerciseId = ${exerciseId}`)
        // // .returning("*")
        // // .updateEntity(true)
        // .execute()
    
    
    .update({
        userUsername,
        exerciseId,
    }, {
        dateTime,
        qtAttempts,
        qtRights
    })

    return result
  }

  async findOneByIds(userUsername: string, exerciseId: string): Promise<UserExercise | undefined> {
    const userExercise = await this.userExerciseRepository.findOneBy({
      userUsername,
      exerciseId
    })
    if (!userExercise) {
      return undefined
    }
    return userExercise
  }
}

export default UserExerciseRepository