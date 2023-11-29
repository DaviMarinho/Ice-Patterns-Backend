import { Mission } from "./mission"
import { User } from "./user"

export type UserMission = {
    userUsername: string

    missionId: string

    progress: number
  
    dateTimeStarted: Date

    dateTimeCompleted?: Date

    user: User

    mission: Mission
  }