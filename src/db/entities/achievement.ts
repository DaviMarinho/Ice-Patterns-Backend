import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { User } from "./user"
import { UserAchievement } from './userAchievement'
  
  @Entity()
  export class Achievement {  
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column()
    name: string
  
    @Column()
    description: string

    @OneToMany(() => UserAchievement, userAchievement => userAchievement.achievement)
    public userAchievements: UserAchievement[];
  }