// import { UserAchievement } from './userAchievement'

import { Content } from "./content"
import { Exercise } from "./exercise"
import { User } from "./user"


export type Sublevel = {
    id: string

    numSublevel: number

    numLevel: number
  
    name: string
 
    createdAt?: Date
  
    updatedAt?: Date

    users?: User[]

    exercises: Exercise[]

    contents: Content[]
  }