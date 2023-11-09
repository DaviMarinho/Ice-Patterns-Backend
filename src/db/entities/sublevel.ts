import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { Content } from './content'
import { Exercise } from './exercise'
  import { User } from "./user"
  
  @Entity()
  export class Sublevel {  
    @PrimaryColumn()
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

    @OneToMany(() => Exercise, exercise => exercise.sublevel)
    public exercises: Exercise[];

    @OneToMany(() => Content, content => content.sublevel)
    public contents: Content[];
  }