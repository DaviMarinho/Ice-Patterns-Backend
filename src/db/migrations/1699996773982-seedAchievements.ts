import { MigrationInterface, QueryRunner } from 'typeorm'

const achievements = [
  {
    id: '1',
    name: 'Primeiro Nivel do Iceberg',
    description: 'Você completou seu primeiro nível no Iceberg!'
  },
  {
    id: '2',
    name: 'Primeira compra na loja',
    description: 'Você realizou sua primeira compra na loja!'
  },
  {
    id: '3',
    name: '100% na primeira prática',
    description: 'Você acertou todas as questões na sua primeiríssima prática!'
  },
  {
    id: '4',
    name: 'Primeira prática com 100%',
    description: 'É a primeira vez que você acertou 100% dos exercícios! Parabéns!'
  },
  {
    id: '5',
    name: 'Fim do Iceberg',
    description: 'Você completou a trilha do Iceberg!'
  },
]

export class seedAchievements1699996773982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    achievements.forEach(async (achievements) => {
      await queryRunner.query(
        `INSERT INTO \"achievement\"(id, name, description) VALUES('${achievements.id}', '${achievements.name}', '${achievements.description}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
