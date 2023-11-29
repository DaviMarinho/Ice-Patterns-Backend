import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm"
import { Exercise } from "./exercise"
import { User } from "./user"

@Entity()
export class UserExercise {
    @PrimaryColumn()
    public userUsername: string

    @PrimaryColumn()
    public exerciseId: string

    @Column('timestamptz')
    public dateTime: Date

    @Column()
    public qtAttempts: number

    @Column()
    public qtRights: number

    @ManyToOne(() => User, (user) => user.userExercises)
    public user: User

    @ManyToOne(() => Exercise, (exercise) => exercise.userExercises)
    public exercise: Exercise
}