import { Exercise } from "./exercise"

export type Alternative = {
    num: string

    text: string
  
    isAnswer: boolean

    createdAt?: Date
  
    updatedAt?: Date

    exercise: Exercise
  }