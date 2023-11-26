import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { User } from "./user"
import { UserAchievement } from './userAchievement'
  
  @Entity()
  export class Achievement {  
    @PrimaryColumn()
    id: string

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
    public userAchievements?: UserAchievement[];
  }