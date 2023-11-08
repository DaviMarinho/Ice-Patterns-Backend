import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm'
  import { UserAchievement } from './userAchievement'
  import { Sublevel } from './sublevel'
  import { UserMission } from './userMission'

  @Entity()
  export class User {  
    @PrimaryColumn()
    username: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column({ unique: true })
    email: string
  
    @Column()
    name: string
  
    @Column({ select: false })
    password: string

    @Column({ default: 0 })
    qtBooster: number

    @Column({ default: 0 })
    qtEnergy: number

    @Column({ default: 0 })
    qtCube: number

    @Column({ default: 0 })
    qtXpOnLevel: number

    @Column({ default: 0 })
    qtXpTotal: number

    @OneToMany(() => UserAchievement, userAchievement => userAchievement.user)
    public userAchievements?: UserAchievement[];

    @OneToMany(() => UserMission, userMission => userMission.user)
    public userMissions?: UserMission[];

    @ManyToOne(() => Sublevel, sublevel => sublevel.users)
    public sublevel: Sublevel
  }