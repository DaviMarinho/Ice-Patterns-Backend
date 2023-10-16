import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
  } from 'typeorm'
  import { User } from "./user"
  
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

    @ManyToMany(() => User, {
      cascade: true
    })
    users: User[]
  }