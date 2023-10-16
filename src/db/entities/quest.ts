import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    UpdateDateColumn
  } from 'typeorm'
  
  @Entity()
  export class User {  
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

    @Column()
    cubeReward: number

    @Column()
    energyReward: number

    @Column()
    unlocksOnLevel: string
  }