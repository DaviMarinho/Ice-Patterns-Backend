import { MigrationInterface, QueryRunner } from 'typeorm'

const sublevels = [
  {
    id: '1',
    numSublevel: '1',
    numLevel: '1',
    name: 'Padrões de Projeto'
  },
  {
    id: '2',
    numSublevel: '2',
    numLevel: '1',
    name: 'Singleton'
  },
  {
    id: '3',
    numSublevel: '3',
    numLevel: '1',
    name: 'Facade'
  },
  {
    id: '4',
    numSublevel: '1',
    numLevel: '2',
    name: 'Template Method'
  },
  {
    id: '5',
    numSublevel: '2',
    numLevel: '2',
    name: 'Factory Method'
  },
  {
    id: '6',
    numSublevel: '3',
    numLevel: '2',
    name: 'Adapter'
  }
]

export class seedSublevels1699996773982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    sublevels.forEach(async (sublevels) => {
      await queryRunner.query(
        `INSERT INTO \"sublevel\"("id", "numSublevel", "numLevel", name) VALUES('${sublevels.id}', '${sublevels.numSublevel}', '${sublevels.numLevel}', '${sublevels.name}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
