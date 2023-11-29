import { Alternative } from "./alternative"
import { ExerciseType } from "./enum/exerciseType"
import { Sublevel } from "./sublevel"
import { UserExercise } from "./userExercise"

export type Exercise = {
    id: string

    type: ExerciseType
  
    question: string

    orderKey: number
 
    createdAt?: Date
  
    updatedAt?: Date

    alternatives: Alternative[];

    sublevel: Sublevel;

    userExercises?: UserExercise[];

  }