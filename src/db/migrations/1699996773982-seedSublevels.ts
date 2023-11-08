import { MigrationInterface, QueryRunner } from 'typeorm'

const sublevels = [
  {
    id: '1',
    numSublevel: '1',
    numLevel: '1',
    name: 'padroes'
  },
  {
    id: '2',
    numSublevel: '2',
    numLevel: '1',
    name: 'singleton'
  },
  {
    id: '3',
    numSublevel: '3',
    numLevel: '1',
    name: 'facade'
  },
  {
    id: '4',
    numSublevel: '4',
    numLevel: '1',
    name: 'template method'
  },
  {
    id: '5',
    numSublevel: '1',
    numLevel: '2',
    name: 'abc'
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
