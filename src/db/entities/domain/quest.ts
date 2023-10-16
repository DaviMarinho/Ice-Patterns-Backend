export type Quest = {
    id: string

    name: string
  
    description: string

    cubeReward: number

    energyReward: number

    unlocksOnLevel: string
 
    createdAt?: Date
  
    updatedAt?: Date
  }