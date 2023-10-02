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
  }