import { MigrationInterface, QueryRunner } from 'typeorm'

const contents = [
  {
    text: 'o conteudo é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo',
    position: '1',
    sublevelId: '1'
  },
  {
    text: 'o conteudo é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo',
    position: '2',
    sublevelId: '1'
  }
]

export class seedContents1699996988982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    contents.forEach(async (contents) => {
      await queryRunner.query(
        `INSERT INTO \"content\"("text", "position", "sublevelId") VALUES('${contents.text}', '${contents.position}', '${contents.sublevelId}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
