import { MigrationInterface, QueryRunner } from 'typeorm'

const achievements = [
  {
    name: 'Primeiro Nivel do Iceberg',
    description: 'Você completou seu primeiro nível no Iceberg!'
  },
  {
    name: 'Acerto de Questões',
    description: 'Você acertou todas as questões na sua primeiríssima prática!'
  },
  {
    name: 'Fim do Iceberg',
    description: 'Você completou a trilha do Iceberg!'
  }
]

export class seedAchievements1698996773982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    achievements.forEach(async (achievements) => {
      await queryRunner.query(
        `INSERT INTO \"achievement\"(name, description) VALUES('${achievements.name}', '${achievements.description}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
