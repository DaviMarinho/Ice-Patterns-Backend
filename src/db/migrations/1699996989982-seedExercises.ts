import { MigrationInterface, QueryRunner } from 'typeorm'
import { ExerciseType } from '../entities/domain/enum/exerciseType'

const exercises = [
  {
    id: '1',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Qual dos seguintes padrões é um padrão criacional?',
    orderKey: '1',
    sublevelId: '1'
  },
  {
    id: '2',
    type: ExerciseType.TRUE_FALSE,
    question: 'O Singleton é um padrão criacional.',
    orderKey: '2',
    sublevelId: '1'
  }
]

export class seedExercises1699996988982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    exercises.forEach(async (exercises) => {
      await queryRunner.query(
        `INSERT INTO \"exercise\"("id", "type", "question", "orderKey", "sublevelId") VALUES('${exercises.id}', '${exercises.type}', '${exercises.question}', '${exercises.orderKey}', '${exercises.sublevelId}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
