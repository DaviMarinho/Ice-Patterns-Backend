import { UserMission } from "./userMission"


export type Mission = {
    id: string

    name: string
  
    description: string

    rewardBooster: number

    rewardEnergy: number

    rewardCube: number

    rewardXp: number

    unlocksOnLevel: string
 
    createdAt?: Date
  
    updatedAt?: Date

    userMissions?: UserMission[];
  }