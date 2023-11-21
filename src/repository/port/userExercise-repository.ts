import { UpdateResult } from 'typeorm'
import { UserExercise } from '../../db/entities/userExercise'

export interface UserExercisesRepository {
  createUserExercise(userUsername: string, exerciseId: string, dateTime: Date, qtAttempts: number, qtRights: number): Promise<UserExercise | undefined>
  updateUserExercise(userUsername: string, exerciseId: string, dateTime: Date, qtAttempts: number, qtRights: number): Promise<UpdateResult | undefined>
  findOneByIds(userUsername: string, exerciseId: string): Promise<UserExercise | undefined>
}