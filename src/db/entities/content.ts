import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm'
import { Sublevel } from './sublevel'
  
  @Entity()
  export class Content {  
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column()
    text: string

    @Column()
    title: string
  
    @Column()
    position: number

    @ManyToOne(() => Sublevel, sublevel => sublevel.contents)
    @JoinColumn()
    public sublevel: Sublevel
  }