import { Sublevel } from "../../../db/entities/sublevel"
import { UserMission } from "../../../db/entities/userMission"

export interface CreateUserResponse {
    email: string
    username: string
    sublevel: Sublevel
    missionUnlocked?: UserMission
  }