import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm'
import { Alternative } from './alternative'
import { ExerciseType } from './domain/enum/exerciseType'
import { Sublevel } from './sublevel'
import { UserExercise } from './userExercise'
  
  @Entity()
  export class Exercise {  
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column({type: 'enum', enum: ExerciseType})
    type: string
  
    @Column()
    question: string

    @Column()
    orderKey: number

    @OneToMany(() => Alternative, (alternative) => alternative.exercise)
    alternatives: Alternative[]

    @ManyToOne(() => Sublevel, sublevel => sublevel.exercises)
    public sublevel: Sublevel

    @OneToMany(() => UserExercise, userExercise => userExercise.exercise)
    public userExercises?: UserExercise[];
  }