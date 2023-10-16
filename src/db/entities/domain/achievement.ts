import { User } from "./user"

export type Achievement = {
    id: string

    name: string
  
    description: string
 
    createdAt?: Date
  
    updatedAt?: Date

    users: User[]
  }