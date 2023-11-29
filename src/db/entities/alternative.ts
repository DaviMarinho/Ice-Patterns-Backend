import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { Exercise } from './exercise'
  
  @Entity()
  export class Alternative {  
    @PrimaryColumn()
    num: string

    @PrimaryColumn()
    public exerciseId: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column()
    text: string
  
    @Column()
    isAnswer: boolean

    @ManyToOne(() => Exercise, (exercise) => exercise.alternatives)
    exercise: Exercise
  }