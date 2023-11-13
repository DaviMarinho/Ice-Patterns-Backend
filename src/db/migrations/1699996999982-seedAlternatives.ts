import { MigrationInterface, QueryRunner } from 'typeorm'
import { ExerciseType } from '../entities/domain/enum/exerciseType'

const alternatives = [
  {
    num: '1',
    exerciseId: '1',
    text: 'Decorator',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '1',
    text: 'Observer',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '1',
    text: 'Singleton',
    isAnswer: true
  },
  {
    num: '4',
    exerciseId: '1',
    text: 'Proxy',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '2',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '2',
    text: 'Falso',
    isAnswer: false
  },
]

export class seedAlternatives1699996988982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    alternatives.forEach(async (alternatives) => {
      await queryRunner.query(
        `INSERT INTO \"alternative\"("num", "exerciseId", "text", "isAnswer") VALUES('${alternatives.num}', '${alternatives.exerciseId}', '${alternatives.text}', '${alternatives.isAnswer}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
