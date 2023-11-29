import { Mission } from "../../../db/entities/mission";

export interface DetailedMission {
    mission: Mission,
    progress: number,
    dateTimeStarted: Date,
    dateTimeCompleted?: Date
}

export interface GetUserMissionsResponse {
    missions: DetailedMission[]
}
