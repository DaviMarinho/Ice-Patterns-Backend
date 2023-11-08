import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Mission } from "./mission"
import { User } from "./user"

@Entity()
export class UserMission {
    @PrimaryColumn()
    public userUsername: string

    @PrimaryColumn()
    public missionId: string

    @Column()
    public progress: number

    @Column('timestamptz')
    public dateTimeStarted: Date

    @Column('timestamptz')
    public dateTimeCompleted?: Date

    // @ManyToOne(() => User, (user) => user.userMissions)
    // public user: User

    // @ManyToOne(() => Mission, (mission) => mission.userMissions)
    // public mission: Mission
}