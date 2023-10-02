import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm'
  
  @Entity()
  export class User {  
    @PrimaryGeneratedColumn()
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
  }