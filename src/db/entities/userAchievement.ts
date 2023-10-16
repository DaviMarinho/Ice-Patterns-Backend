import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Achievement } from "./achievement"
import { User } from "./user"

@Entity()
export class UserAchievement {
    @PrimaryColumn()
    public userUsername: string

    @PrimaryColumn()
    public achievementId: string

    @Column('timestamptz')
    public dateTime: Date

    @ManyToOne(() => User, (user) => user.userAchievements)
    public user: User

    @ManyToOne(() => Achievement, (achievement) => achievement.userAchievements)
    public achievement: Achievement
}