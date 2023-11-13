import { Sublevel } from "./sublevel"

export type Content = {
    id: string

    text: string
  
    position: number
 
    createdAt?: Date
  
    updatedAt?: Date

    sublevelId: Sublevel;
  }