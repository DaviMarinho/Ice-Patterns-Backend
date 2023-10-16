import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm'
  
  @Entity()
  export class Exercise {  
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @Column({ type: 'timestamptz' })
    @CreateDateColumn()
    createdAt?: Date
  
    @Column({ type: 'timestamptz' })
    @UpdateDateColumn()
    updatedAt?: Date
  
    @Column()
    tipo: string
  
    @Column()
    enunciado: string

    @Column()
    chaveOrdenacao: number
  }