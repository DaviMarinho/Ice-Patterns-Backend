import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { User } from "./user"
import { UserMission } from './userMission'
  
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
    rewardCube: number

    @Column()
    rewardXp: number

    @Column()
    unlocksOnLevel: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date

    @OneToMany(() => UserMission, userMission => userMission.mission)
    public userMissions?: UserMission[];
  }