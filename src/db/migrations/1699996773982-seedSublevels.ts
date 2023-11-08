import { MigrationInterface, QueryRunner } from 'typeorm'

const sublevels = [
  {
    numSublevel: '1',
    numLevel: '1',
    name: 'padroes'
  },
  {
    numSublevel: '2',
    numLevel: '1',
    name: 'singleton'
  },
  {
    numSublevel: '3',
    numLevel: '1',
    name: 'facade'
  },
  {
    numSublevel: '4',
    numLevel: '1',
    name: 'template method'
  },
  {
    numSublevel: '1',
    numLevel: '2',
    name: 'abc'
  }
]

export class seedSublevels1699996773982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    sublevels.forEach(async (sublevels) => {
      await queryRunner.query(
        `INSERT INTO \"sublevel\"("numSublevel", "numLevel", name) VALUES('${sublevels.numSublevel}', '${sublevels.numLevel}', '${sublevels.name}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
