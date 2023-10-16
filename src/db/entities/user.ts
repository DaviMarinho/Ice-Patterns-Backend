import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { UserAchievement } from './userAchievement'

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

    @OneToMany(() => UserAchievement, userAchievement => userAchievement.user)
    public userAchievements: UserAchievement[];
  }