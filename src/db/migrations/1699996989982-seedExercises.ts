import { MigrationInterface, QueryRunner } from 'typeorm'
import { ExerciseType } from '../entities/domain/enum/exerciseType'

const exercises = [
  {
    id: '1',
    type: ExerciseType.TRUE_FALSE,
    question: 'Os padrões de projeto comportamentais se preocupam com algoritmos e atribuição de responsabilidade entre objetos, focando também nos padrões de comunicação entre objetos, e como eles são interconectados.',
    orderKey: '1',
    sublevelId: '1'
  },
  {
    id: '2',
    type: ExerciseType.TRUE_FALSE,
    question: 'Os padrões de projeto são soluções fixas que podem ser aplicadas nos problemas de projeto de software. Mesmo que não seja a solução mais eficiente, aplicar algum padrão de projeto com certeza trará algum benefício à sua implementação.',
    orderKey: '2',
    sublevelId: '1'
  },
  {
    id: '3',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Assinale a alternativa INCORRETA:',
    orderKey: '3',
    sublevelId: '1'
  },
  {
    id: '4',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Sobre padrões de projeto, assinale a sequência que corresponde às afirmativas a seguir, sendo V para verdadeira e F para falsa: Os padrões de projeto foram criados pelo Gang of Four; O uso dos padrões em qualquer projeto de software garante a redução de código duplicado e aumenta a reutilização de código; Alguns elementos comumente utilizados para descrever cada padrão de projeto são: nome, propósito, estrutura e aplicabilidade.',
    orderKey: '4',
    sublevelId: '1'
  },
  {
    id: '5',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'O padrão de projeto Singleton, que garante que uma classe tenha somente uma instância, fornecendo um ponto global de acesso para essa instância, é classificado como um padrão de projeto:',
    orderKey: '1',
    sublevelId: '2'
  },
  {
    id: '6',
    type: ExerciseType.TRUE_FALSE,
    question: 'O padrão Singleton funciona criando um novo construtor da classe, que verifica se o objeto a ser criado já existe, e retorna sempre essa mesma instância, sem criar novas instâncias toda vez que for chamado.',
    orderKey: '2',
    sublevelId: '2'
  },
  {
    id: '7',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Maria deparou-se com um problema no seu projeto de software, e para resolvê-lo, pensou em utilizar o padrão Singleton. Porém, está na dúvida se a utilização do padrão realmente é necessária e será benéfica. Qual das situações a seguir representa uma oportunidade de aplicar o padrão Singleton:',
    orderKey: '3',
    sublevelId: '2'
  },
  {
    id: '8',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Sobre o padrão de projeto Facade, assinale a alternativa CORRETA:',
    orderKey: '1',
    sublevelId: '3'
  },
  {
    id: '9',
    type: ExerciseType.TRUE_FALSE,
    question: 'Um dos principais objetivos do padrão Facade é isolar a complexidade de um subsistema, seja ele uma biblioteca, framework ou outro conjunto de classes.',
    orderKey: '2',
    sublevelId: '3'
  },
  {
    id: '10',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'O padrão de projeto Facade, que fornece uma interface unificada para um conjunto de interfaces em um subsistema, é classificado como um padrão de projeto:',
    orderKey: '3',
    sublevelId: '3'
  },
  {
    id: '11',
    type: ExerciseType.TRUE_FALSE,
    question: 'O Template Method é utilizado para definir um esqueleto de um algoritmo em uma classe base, deixando que as subclasses implementem os detalhes específicos:',
    orderKey: '1',
    sublevelId: '4'
  },
  {
    id: '12',
    type: ExerciseType.TRUE_FALSE,
    question: 'O Template Method é um padrão baseado em heranças:',
    orderKey: '2',
    sublevelId: '4'
  },
  {
    id: '13',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'O padrão de projeto Template Method, que define um esqueleto de algoritmo em uma classe, para que as subclasses implementem etapas específicas, é classificado como um padrão de projeto:',
    orderKey: '3',
    sublevelId: '4'
  },
  {
    id: '14',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'O Factory Method é definido corretamente como um padrão de projeto que:',
    orderKey: '1',
    sublevelId: '5'
  },
  {
    id: '15',
    type: ExerciseType.TRUE_FALSE,
    question: 'No Factory Method, o método “factory” (fábrica) fica dentro da classe criadora, e deve obrigatoriamente ser abstrato:',
    orderKey: '2',
    sublevelId: '5'
  },
  {
    id: '16',
    type: ExerciseType.TRUE_FALSE,
    question: 'Uma das principais vantagens do padrão Factory Method é evitar o acoplamento entre o método criador abstrato e os objetos concretos, além de o código de criação ficar em um único local do programa, facilitando a manutenção do código:',
    orderKey: '3',
    sublevelId: '5'
  },
  {
    id: '17',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'Assinale a alternativa INCORRETA sobre o padrão de projeto Adapter:',
    orderKey: '1',
    sublevelId: '6'
  },
  {
    id: '18',
    type: ExerciseType.MULTIPLE_CHOICE,
    question: 'João está trabalhando em um projeto de software que trata dados. Uma classe de seu programa recebe dados em formato XML, mas João possui uma outra classe de análise de dados que trabalha apenas com o formato JSON. Dessa forma, o padrão de projeto Adapter poderia ser utilizado como um adaptador do formato de dados no programa. Qual dos seguintes critérios NÃO É relevante para a decisão de utilizar ou não o padrão adapter nesse contexto?',
    orderKey: '2',
    sublevelId: '6'
  },
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
