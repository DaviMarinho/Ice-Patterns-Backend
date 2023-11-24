import { MigrationInterface, QueryRunner } from 'typeorm'
import { ExerciseType } from '../entities/domain/enum/exerciseType'

const alternatives = [
  {
    num: '1',
    exerciseId: '1',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '1',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '2',
    text: 'Verdadeiro',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '2',
    text: 'Falso',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '3',
    text: 'Os padrões de projeto são soluções comuns para problemas de software',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '3',
    text: 'No livro do Gang of Four os padrões de projeto são classificados em criacionais, estruturais e comportamentais',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '3',
    text: 'É sempre importante utilizar diferentes padrões em um único projeto de software para garantir a flexibilização e a reutilização do código',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '4',
    text: 'V - V - V',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '4',
    text: 'F - V - F',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '4',
    text: 'V - F - F',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '4',
    text: 'F - F - V',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '5',
    text: 'Criacional, que fornece um mecanismo de criação de objetos mais flexível, ajudando a tornar o sistema independente da forma como os objetos são criados, compostos e representados;',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '5',
    text: 'Estrutural, que define como montar objetos e classes em estruturas maiores;',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '5',
    text: 'Comportamental, que cuida da comunicação eficiente e da atribuição de responsabilidade entre objetos',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '6',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '6',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '7',
    text: 'Quando não se sabe exatamente os tipos e as dependências exatas dos objetos com o qual o código funcionará',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '7',
    text: 'Quando a interface de uma classe existente não for compatível com o restante do código',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '7',
    text: 'Quando se deseja estruturar um subsistema em camadas',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '7',
    text: 'Quando possui uma classe que deve ter apenas uma única instância disponível para todos os clientes',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '8',
    text: 'É usado especificamente na programação estruturada de sistemas',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '8',
    text: 'O padrão não pode ser usado quando há interesse em dividir seus subsistemas em camadas',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '8',
    text: 'Define uma interface comum para um conjunto de interfaces em um subsistema',
    isAnswer: true
  },
  {
    num: '4',
    exerciseId: '8',
    text: 'Promove forte acoplamento entre os subsistemas e seus clientes',
    isAnswer: false
  },
  {
    num: '5',
    exerciseId: '8',
    text: 'Evita que aplicações acessem as subclasses diretamente',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '9',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '9',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '10',
    text: 'Criacional, que fornece um mecanismo de criação de objetos mais flexível, ajudando a tornar o sistema independente da forma como os objetos são criados, compostos e representados;',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '10',
    text: 'Estrutural, que define como montar objetos e classes em estruturas maiores, ou',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '10',
    text: 'Comportamental, que cuida da comunicação eficiente e da atribuição de responsabilidade entre objetos.',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '11',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '11',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '12',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '12',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '13',
    text: 'Criacional, que fornece um mecanismo de criação de objetos mais flexível, ajudando a tornar o sistema independente da forma como os objetos são criados, compostos e representados;',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '13',
    text: 'Estrutural, que define como montar objetos e classes em estruturas maiores, ou',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '13',
    text: 'Comportamental, que cuida da comunicação eficiente e da atribuição de responsabilidade entre objetos, tornando a implementação de comportamentos complexos mais gerenciável e modular.',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '14',
    text: 'garante que apenas uma instância de uma classe seja criada e fornece um ponto global de acesso a essa instância',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '14',
    text: 'facilita a comunicação entre objetos de diferentes classes',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '14',
    text: 'permite a criação de múltiplas instâncias de uma classe',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '14',
    text: 'define uma interface para criar um objeto, mas deixar as subclasses decidirem qual classe instanciar',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '15',
    text: 'Verdadeiro',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '15',
    text: 'Falso',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '16',
    text: 'Verdadeiro',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '16',
    text: 'Falso',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '17',
    text: 'é um padrão estrutural que converte a interface de uma classe em outra interface, permitindo objetos com interfaces incompatíveis colaborarem entre si.',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '17',
    text: 'pode ser implementado em duas vias, adaptando a classe X para a classe Y e vice-versa',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '17',
    text: 'só pode ser utilizado entre uma classe do programa e uma classe externa, ou seja, de uma biblioteca ou framework',
    isAnswer: true
  },
  {
    num: '4',
    exerciseId: '17',
    text: 'pode ser implementado tanto um adaptador de objeto quanto um adaptador de classe',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '18',
    text: 'verificar se o programa possui classes de interfaces incompatíveis, mas que precisam colaborar entre si',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '18',
    text: 'verificar se é possível subdividir o algoritmo da classe de análise de dados em etapas',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '18',
    text: 'verificar se uma ou mais classes do programa seriam beneficiadas pelo uso da classe de análise de dados',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '18',
    text: 'verificar se João possui acesso ao código da classe de análise de dados, e se a mesma possui muitas dependências existentes',
    isAnswer: false
  },

  {
    num: '1',
    exerciseId: '19',
    text: 'Facade',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '19',
    text: 'Singleton',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '19',
    text: 'Template Method',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '19',
    text: 'Decorator',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '20',
    text: 'fornecer maneiras eficientes de criar objetos',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '20',
    text: 'descrever como os objetos são colocados juntos',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '20',
    text: 'distribuir responsabilidades entre os objetos',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '21',
    text: 'Template Method',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '21',
    text: 'Singleton',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '21',
    text: 'Factory Method',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '21',
    text: 'Facade',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '22',
    text: 'garante que apenas uma instância de uma classe seja criada e fornece um ponto global de acesso a essa instância',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '22',
    text: 'permite a criação de múltiplas instâncias de uma classe',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '22',
    text: 'facilita a comunicação entre objetos de diferentes classes',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '22',
    text: 'facilita a criação de herança múltipla em linguagens de programação que não a suportam nativamente',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '23',
    text: 'Singleton',
    isAnswer: true
  },
  {
    num: '2',
    exerciseId: '23',
    text: 'Facade',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '23',
    text: 'Template Method',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '23',
    text: 'Factory Method',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '24',
    text: 'F - F - V - F',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '24',
    text: 'V - F - F - V',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '24',
    text: 'V - V - F - V',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '24',
    text: 'V - F - V - F',
    isAnswer: false
  },
  {
    num: '1',
    exerciseId: '25',
    text: 'Ambos são padrões estruturais',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '25',
    text: 'O Adapter busca fazer uma interface existente ser utilizável por outra interface incompatível a ela',
    isAnswer: false
  },
  {
    num: '3',
    exerciseId: '25',
    text: 'O Adapter trabalha com subsistemas de objetos, enquanto o Facade envolve apenas um objeto',
    isAnswer: true
  },
  {
    num: '1',
    exerciseId: '26',
    text: 'Adapter, Factory Method, Template Method',
    isAnswer: false
  },
  {
    num: '2',
    exerciseId: '26',
    text: 'Singleton, Adapter, Template Method',
    isAnswer: true
  },
  {
    num: '3',
    exerciseId: '26',
    text: 'Factory Method, Singleton, Facade',
    isAnswer: false
  },
  {
    num: '4',
    exerciseId: '26',
    text: 'Facade, Factory Method, Adapter',
    isAnswer: false
  },
]

export class seedAlternatives1699996988982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    alternatives.forEach(async (alternatives) => {
      await queryRunner.query(
        `INSERT INTO \"alternative\"("num", "exerciseId", "text", "isAnswer") VALUES('${alternatives.num}', '${alternatives.exerciseId}', '${alternatives.text}', '${alternatives.isAnswer}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
