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
    name: 'Mais de 1000 cubos',
    description: 'Você acumulou mais de 1.000 cubos!'
  },
  {
    id: '4',
    name: 'Subir de nível impulsionado',
    description: 'Você subiu de nível estando impulsionado!'
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
