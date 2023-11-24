import { MigrationInterface, QueryRunner } from 'typeorm'

const contents = [
  {
    text: 'Os padrões de projeto em software são soluções para problemas comuns em um projeto de software. Um padrão não é um trecho de código utilizável em diversas situações, mas sim um conceito geral utilizado para resolver problemas de projeto orientado a objetos.',
    title: 'O que são Padrões de Projeto?',
    position: '1',
    sublevelId: '1'
  },
  {
    text: 'Os padrões de projetos não são necessariamente criados ou inventados por alguém. São soluções típicas para problemas comuns. Sendo assim, as soluções vão sendo repetidamente utilizadas em projetos, e eventualmente ela será descrita e caracterizada de maneira mais formal, surgindo assim um padrão de projeto.',
    title: 'O que são Padrões de Projeto?',
    position: '2',
    sublevelId: '1'
  },
  {
    text: 'Um livro de grande referência para o assunto, “Padrões de Projeto - Soluções reutilizáveis de software orientado a objetos” dos autores conhecidos como “Gang of Four”, identifica 23 padrões, divididos em 3 categorias com base em seu propósito: criacionais, estruturais e comportamentais.',
    title: 'O que são Padrões de Projeto?',
    position: '3',
    sublevelId: '1'
  },
  {
    text: 'Padrões Criacionais: são utilizados na criação de objetos para flexibilizar, tornando os sistemas independentes da maneira como os objetos são criados, além de aumentar a reutilização de código;',
    title: 'O que são Padrões de Projeto?',
    position: '4',
    sublevelId: '1'
  },
  {
    text: 'Padrões Estruturais: tratam da composição de classes e objetos para formar estruturas maiores, ainda mantendo-as flexíveis e eficientes, e',
    title: 'O que são Padrões de Projeto?',
    position: '5',
    sublevelId: '1'
  },
  {
    text: 'Padrões Comportamentais: focam na atribuição de responsabilidades entre objetos e a comunicação entre eles, facilitando a visualização e o controle de fluxos complexos.',
    title: 'O que são Padrões de Projeto?',
    position: '6',
    sublevelId: '1'
  },
  {
    text: 'Para descrever os padrões de projeto, alguns elementos são comumente utilizados, sendo alguns deles: Nome e classificação; Motivação: explica o problema e a solução que o padrão torna possível; Aplicabilidade: explicita situações em que o padrão pode ser aplicado, e como reconhecer essas situações; Estruturas: mostram as partes do padrão e como se relacionam; Exemplo de código: trechos de código que mostram como o padrão pode ser implementado, e Padrões relacionados: apresentam os padrões que estão intimamente relacionados a ele, explicitando as semelhanças, diferenças e como podem ser usados em conjunto.',
    title: 'Alguns elementos dos padrões de projeto',
    position: '7',
    sublevelId: '1'
  },
  {
    text: 'Os padrões de projeto não são soluções prontas fixas. Logo, não devem ser usadas em todos os contextos sem justificativas. O uso ineficiente de padrões de projeto pode complicar o projeto de software e gerar mais dificuldade do que solucionar problemas de fato.',
    title: 'Contras de alguns padrões',
    position: '8',
    sublevelId: '1'
  },
  {
    text: 'Sendo assim, é importante sempre entender as situações em que os padrões podem ser úteis, bem como estar ciente dos seus possíveis malefícios em caso de alterações futuras no projeto, além de compreender como utilizar os padrões adaptados a cada contexto.',
    title: 'Contras de alguns padrões',
    position: '9',
    sublevelId: '1'
  },

  {
    text: 'É um padrão criacional que, de acordo com Gamma et al, é usado para “garantir que uma classe tenha somente uma instância, fornecendo um ponto global de acesso para a mesma”.<q><q>O Singleton resolve essencialmente dois problemas:<t>Garantir que uma classe tenha somente uma instância: cria-se um objeto, e depois decidiu-se criar um novo. Porém, ao invés de receber um novo objeto, receberá o objeto que já foi criado anteriormente<t>Fornecer um ponto global de acesso à instância: assim como uma variável global, o padrão Singleton permite que você acesse algum objeto de qualquer lugar no programa. Contudo, ele também protege aquela instância de ser sobrescrita por outro código',
    title: 'Singleton',
    position: '1',
    sublevelId: '2'
  },
  {
    text: 'public class Singleton {<q><tab>private static Singleton uniqueInstance;<q><q><tab>private Singleton () {<q><tab>}<q><q><tab>public static synchronized Singleton getInstance () {<q><tab><tab>if ( uniqueInstance == null )<q><tab><tab><tab>uniqueInstance = new Singleton();<q><q><tab<tab>return uniqueInstance;<q><tab>}<q>}',
    title: 'Singleton - Exemplo de código',
    position: '2',
    sublevelId: '2'
  },
  {
    text: 'O construtor privado garante que nenhuma outra classe o sistema consiga instanciar a classe do Singleton, fazendo com que nenhuma outra classe crie várias instâncias dessa mesma classe<q><q>O método de acesso público garante que exista apenas um ponto de acesso global para essa classe. É a partir desse método que a lógica do Singleton funciona, pois assim apenas uma instância dessa classe será retornada para o sistema.<q><q>O atributo estático garante que não seja possível criar uma classe fora da lógica do Singleton, fazendo com que seja preciso acessar o método estático getInstance(), o qual retorna esse atributo estático.',
    title: 'Singleton - Exemplo de código',
    position: '3',
    sublevelId: '2'
  },
  {
    text: '<t>Quando o programa deve ter apenas uma instância disponível para todos os clientes, e<t>Quando é necessário um controle mais estrito sobre as variáveis globais.',
    title: 'Singleton - Aplicabilidade',
    position: '4',
    sublevelId: '2'
  },

  {
    text: 'É um padrão estrutural, que fornece uma interface simplificada para uma biblioteca, um framework ou qualquer conjunto complexo de classes.<q><q>De acordo com Gamma et al, o Façade “fornece uma interface unificada para um conjunto de interfaces em um subsistema. Façade define uma interface de nível mais alto que torna o subsistema mais fácil de ser usado.”',
    title: 'Facade',
    position: '1',
    sublevelId: '3'
  },
  {
    text: 'Ter uma fachada (o facade) é útil quando precisa-se integrar a aplicação com uma biblioteca mais complexa, com muitas funcionalidades. Dessa forma, a fachada poderia fornecer convenientemente o acesso a uma funcionalidade específica do subsistema (biblioteca). Ao final, ao invés da aplicação se comunicar diretamente com os objetos do subsistema diretamente, ela é utilizada através da fachada.',
    title: 'Facade',
    position: '2',
    sublevelId: '3'
  },
  {
    text: 'class SubSystem1 {<q><tab>// ...<q>}<q><q>class SubSystem2 {<q><tab>// ...<q>}<q><q>class SubSystem3 {<q><tab>// ...<q>}<q><q>class SubSystem4 {<q><tab>// ...<q>}<q><q>class Facade {<q><tab>public void process () {<q><tab><tab>SubSystem1 subsystem1 = new SubSystem1();<q><tab><tab>SubSystem2 subsystem2 = new SubSystem2();<q><tab><tab>SubSystem3 subsystem3 = new SubSystem3();<q><tab><tab>SubSystem4 subsystem4 = new SubSystem4();<q><tab><tab>// …<q><tab>}<q>}<q><q>class Application {<q><tab>public static void main ( String [] args ) {<q><tab><tab>Facade facade = new Facade();<q><tab><tab>facade.process();<q><tab>}<q>}',
    title: 'Facade - Exemplo de código',
    position: '3',
    sublevelId: '3'
  },
  {
    text: 'Os “subsystems” representam algumas classes, por exemplo, de um framework complexo.<q><q>A classe Facade é a classe fachada que esconde a complexidade do framework e de seus subsistemas, fornecendo uma interface mais simples. Essa classe possuirá, por exemplo, métodos (como o “process” do exemplo) que farão o tratamento e a organização necessários para as funcionalidades do framework.<q><q>Por fim, a classe Application representa a aplicação em si, que não dependerá diretamente de diversas classes fornecidas pelo framework complexo. Ao invés disso, a classe se comunicará com a fachada.',
    title: 'Facade - Exemplo de código',
    position: '4',
    sublevelId: '3'
  },
  {
    text: '<t>Uma vantagem é que, se decidir trocar de subsistema (por exemplo, trocar de um framework para outro de mesmo propósito), será necessário basicamente reescrever a classe fachada, minimizando o esforço de alterações na aplicação;<t>Quando se precisa ter uma interface limitada e simples para um subsistema complexo, e<t>Quando quer estruturar um subsistema em camadas.',
    title: 'Facade - Aplicabilidade',
    position: '5',
    sublevelId: '3'
  },
  {
    text: '<t>Singleton: uma classe fachada pode frequentemente ser transformada em uma singleton, já que um único objeto fachada é suficiente na maioria dos casos.',
    title: 'Facade - Relação com outros padrões',
    position: '6',
    sublevelId: '3'
  },

  {
    text: 'É um padrão comportamental que define o esqueleto de um algoritmo na superclasse, mas deixa as subclasses sobrescrever etapas específicas do algoritmo sem modificar sua estrutura.',
    title: 'Template Method',
    position: '1',
    sublevelId: '4'
  },
  {
    text: 'O padrão sugere que se divida um algoritmo em etapas, e transforme essas etapas em métodos, colocando uma série de chamadas para esses métodos dentro de um único método padrão. As etapas podem ser tanto abstratas, ou ter alguma implementação padrão.<q><q>Para usar o algoritmo, o cliente deve fornecer sua própria subclasse, implementar todas as etapas abstratas, e sobrescrever algumas das opcionais se necessário (mas não o próprio método padrão).',
    title: 'Template Method',
    position: '2',
    sublevelId: '4'
  },
  {
    text: 'public abstract class DomesticActivities {<q><tab>final void doDailyActivities () {<q><tab><tab>cleanHouse () ;<q><tab><tab>washDishes () ;<q><tab><tab>washClothes () ;<q><tab>}<q><tab>void cleanHouse () {<q><tab><tab>System.out.println ( " Mop the house . " ) ;<q><tab>}<q>void washDishes () {<q><tab><tab>System.out.println ( " Wash the dishes . " ) ;<q><tab>}<q><tab>abstract void washClothes () ;<q>}<q><q>class WeekendActivities extends DomesticActivities {<q><tab>void cleanHouse () {<q><tab><tab>System.out.println ( " Clean the house and bathrooms . " ) ;<q><tab>}<q><tab>void washDishes () {<q><tab><tab>System.out.println ( " Wash the dishes and the pans " ) ;<q><tab>}<q><tab>void washClothes () {<q><tab><tab>System.out.println ( " Wash used towels . " ) ;<q><tab>}<q><tab>void tidyBackyard () {<q><tab><tab>System.out.println ( " Clean backyard and mow the lawn . " ) ;<q><tab>}<q>}<q><q>class WeeklyActivity extends DomesticActivities {<q><tab>void cleanHouse () {<q><tab><tab>System.out.println ( " Sweep and mop the house . " ) ;<q><tab>}<q><tab>void washDishes () {<q><tab><tab>System.out.println ( " Wash the dishes and tidying up the kitchen " ) ;<q><tab>}<q><tab>void washClothes () {<q><tab><tab>System.out.println ( " Wash clothes and dirty bed linens . " ) ;<q><tab>}<q><tab>void washRug () {<q><tab><tab>System.out.println ( " Wash the living room rug . " ) ;<q><tab>}<q>}',
    title: 'Template Method - Exemplo de código',
    position: '3',
    sublevelId: '4'
  },
  {
    text: 'No exemplo, na classe base abstrata “DomesticActivities”, tem-se o método padrão (“doDailyActivities”), que chama as etapas do algoritmo; método abstrato (“washClothes”), que deve ser implementados por cada subclasse; e métodos que já possuem alguma implementação padrão (“cleanHouse”, “washDishes”), mas ainda podem ser sobrescritos se necessário. Além de sobrescrever alguns métodos, as subclasses ainda implementam métodos próprios, como “tidyBackyard” e “washRug”.',
    title: 'Template Method - Exemplo de código',
    position: '4',
    sublevelId: '4'
  },
  {
    text: '<t>Quando quer deixar os clientes estender apenas etapas particulares de um algoritmo, mas não todo o algoritmo e sua estrutura, e<t>Quando se têm várias classes que contém algoritmos quase idênticos com algumas diferenças menores. Como resultado, pode querer modificar todas as classes quando o algoritmo muda.',
    title: 'Template Method - Aplicabilidade',
    position: '5',
    sublevelId: '4'
  },

  {
    text: 'É um padrão criacional que, de acordo com Gamma et al, define uma interface para criar um objeto, mas deixar as subclasses decidirem qual classe instanciar. Permite adiar a instanciação para subclasse.<q><q>O padrão Factory Method traz a ideia de substituir chamadas diretas de construção de objetos, por chamadas para um método “factory” especial.',
    title: 'Factory Method',
    position: '1',
    sublevelId: '5'
  },
  {
    text: 'public interface Transport {<q><tab>void deliver();<q>}<q><q>public class Truck implements Transport {<q><tab>public void deliver() {<q><tab><tab>System.out.println ( "Entrega por rodovias em caixas" ) ;<q><tab>}<q>}<q><q>public class Ship implements Transport {<q><tab>public void deliver() {<q><tab><tab>System.out.println ( "Entrega por mar em container" ) ;<q><tab>}<q>}<q><q>public abstract class Logistics {<q><tab>public void planDelivery() {<q><tab><tab>Transport transp = createTransport();<q><tab><tab>transp.deliver();<q><tab>}<q><tab>public abstract Transport createTransport();<q>}<q><q>public class RoadLogistics extends Logistics {<q><tab>public Transport createTransport() {<q><tab><tab>return new Truck();<q><tab>}<q>}<q><q>public class SeaLogistics extends Logistics {<q><tab>public Transport createTransport() {<q><tab><tab>return new Ship();<q><tab>}<q>}<q><q>* Exemplo de código cliente *<q><q>public class Application {<q><tab>private static Logistics logistics;<q><q><tab>public static void main(String[] args) {<q><tab><tab>prepare();<q><tab><tab>runLogistics();<q><tab>}<q><q><tab>static void prepare() {<q><tab><tab>if (args[0] == “road” || args[0] == “” ) {<q><tab><tab><tab>logistic = new RoadLogistics();<q><tab><tab>} else {<q><tab><tab><tab>logistic = new SeaLogistic();<q><tab><tab>}<q><q><tab>static void runLogistics() {<q><tab><tab>logistic.planDelivery();<q><tab>}<q>}',
    title: 'Factory Method - Exemplo de código',
    position: '2',
    sublevelId: '5'
  },
  {
    text: 'O Transport declara a interface, que é comum a todos os objetos que podem ser criados pelo Logistics e suas subclasses. Truck e Ship são implementações diferentes da interface Transport.<q><q>A classe Logistics declara o método fábrica que retorna novos objetos Transport. É importante que o tipo de retorno desse método corresponda à interface. O método fábrica pode ser declarado como abstrato para forçar todas as subclasses a implementar suas próprias versões do método.<q><q>RoadLogistics e SeaLogistics sobrescrevem o método fábrica base para retornar um tipo diferente de transporte.',
    title: 'Factory Method - Exemplo de código',
    position: '3',
    sublevelId: '5'
  },
  {
    text: '<t>quando não souber de antemão os tipos e dependências exatas dos objetos com os quais seu código deve funcionar;<t>quando desejar fornecer aos usuários da biblioteca ou framework uma maneira de estender seus componentes internos, e<t>quando desejar economizar recursos do sistema reutilizando objetos existentes em vez de recriá-los sempre.',
    title: 'Factory Method - Aplicabilidade',
    position: '4',
    sublevelId: '5'
  },

  {
    text: 'É um padrão estrutural que converte a interface de uma classe em outra interface, permitindo objetos com interfaces incompatíveis colaborarem entre si.<q><q>O adaptador é um objeto que converte por exemplo a interface de um objeto para que outro objeto possa entendê-lo. O adaptador encobre a complexidade da conversão.',
    title: 'Adapter',
    position: '1',
    sublevelId: '6'
  },
  {
    text: 'Suponha-se a comunicação entre dois objetos. Com esse padrão de projeto Adapter, um objeto existente chama os métodos do adaptador de acordo com a interface. Ao receber a chamada, o adaptador repassa a chamada para o segundo objeto, em um formato e uma ordem que o segundo objeto espera.<q><q>Também é possível desenvolver um adaptador de duas vias, que pode adaptar as chamadas nos dois sentidos, do objeto 1 para o objeto 2 e vice versa.',
    title: 'Adapter',
    position: '2',
    sublevelId: '6'
  },
  {
    text: 'CÓDIGOO adaptador de objeto',
    title: 'Adapter - Exemplo de código',
    position: '3',
    sublevelId: '6'
  },
  {
    text: ' Cliente é uma classe que contém a lógica de negócio do programa existente.<q><q>A Interface do Cliente descreve um protocolo que outras classes devem seguir para ser capaz de colaborar com o código cliente.<q><q>O Serviço é alguma classe útil (geralmente de terceiros ou código legado). O cliente não pode usar essa classe diretamente porque ela tem uma interface incompatível.',
    title: 'Adapter - Exemplo de código',
    position: '4',
    sublevelId: '6'
  },
  {
    text: 'O Adaptador é uma classe que é capaz de trabalhar tanto com o cliente quanto o serviço: ela implementa a interface do cliente enquanto encobre o objeto do serviço. O adaptador recebe chamadas do cliente através da interface do cliente e as traduz em chamadas para o objeto encobrido do serviço em um formato que ele possa entender.<q><q>O código cliente não é acoplado à classe concreta do adaptador desde que ele trabalhe com o adaptador através da interface do cliente. Graças a isso, pode-se introduzir novos tipos de adaptadores no programa sem quebrar o código cliente existente. Isso pode ser útil quando a interface de uma classe de serviço é mudada ou substituída: você pode apenas criar uma nova classe adaptador sem mudar o código cliente.',
    title: 'Adapter - Exemplo de código',
    position: '5',
    sublevelId: '6'
  },
  {
    text: 'A implementação de um adaptador de classe utiliza herança, onde o adaptador herda interfaces de ambos os objetos ao mesmo tempo.<q><q>A Classe Adaptador não precisa encobrir quaisquer objetos, porque ela herda os comportamentos tanto do cliente como do serviço. A adaptação acontece dentro dos métodos sobrescritos. O adaptador resultante pode ser usado em lugar de uma classe cliente existente.',
    title: 'Adapter - Adaptador de classe',
    position: '6',
    sublevelId: '6'
  },
  {
    text: '<t>quando quiser utilizar uma classe existente, mas sua interface não for compatível com o resto do código, e<t>quando quer reutilizar diversas subclasses existentes que não possuam alguma funcionalidade comum, a qual, portanto, não pode ser adicionada à superclasse.',
    title: 'Adapter - Aplicabilidade',
    position: '7',
    sublevelId: '6'
  },
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
