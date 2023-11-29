import { Exercise } from "./exercise"
import { User } from "./user"

export type UserExercise = {
    userUsername: string

    exerciseId: string
  
    dateTime: Date

    qtAttempts: number

    qtRights: number

    user: User

    exercise: Exercise
  }