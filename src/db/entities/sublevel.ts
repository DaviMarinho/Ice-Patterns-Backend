import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
  import { User } from "./user"
  
  @Entity()
  export class Sublevel {  
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    numSublevel: number

    @Column()
    numLevel: number

    @Column()
    name: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @OneToMany(() => User, user => user.sublevel)
    public users?: User[];
  }