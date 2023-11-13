import { MigrationInterface, QueryRunner } from 'typeorm'

const contents = [
  {
    text: 'o conteudo é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo',
    title: 'O que são Padrões de Projeto?',
    position: '1',
    sublevelId: '1'
  },
  {
    text: 'o conteudo é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo que é o conteudo que é o conteudinho que é o conteudo',
    position: '2',
    title: 'Padrões Criacionais',
    sublevelId: '1'
  }
]

export class seedContents1699996988982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    contents.forEach(async (contents) => {
      await queryRunner.query(
        `INSERT INTO \"content\"("text", "title", "position", "sublevelId") VALUES('${contents.text}', '${contents.title}', '${contents.position}', '${contents.sublevelId}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
