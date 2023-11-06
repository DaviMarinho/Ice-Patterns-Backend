import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { User } from "./user"
// import { UserAchievement } from './userAchievement'
  
  @Entity()
  export class Mission {  
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string
  
    @Column()
    description: string

    @Column()
    rewardBooster: number
  
    @Column()
    rewardEnergy: number

    @Column()
    unlocksOnLevel: number

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  

    // @OneToMany(() => UserAchievement, userAchievement => userAchievement.achievement)
    // public userAchievements?: UserAchievement[];
  }