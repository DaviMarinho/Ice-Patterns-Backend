import { MigrationInterface, QueryRunner } from 'typeorm'

const missions = [
  {
    name: '8 exercícios',
    description: 'Complete seus primeiros 8 exercícios',
    rewardBooster: '0',
    rewardEnergy: '1',
    rewardCube: '10',
    rewardXp: '5',
    unlocksOnLevel: '1e1e8f7f-b031-4e1e-8b1d-fd460a0b26e2',
  },
  {
    name: '4 exercícios sem errar',
    description: 'Complete 4 exercícios sem errar nenhum',
    rewardBooster: '0',
    rewardEnergy: '0',
    rewardCube: '5',
    rewardXp: '5',
    unlocksOnLevel: '1e1e8f7f-b031-4e1e-8b1d-fd460a0b26e2',
  },
  {
    name: 'Não perca energias',
    description: 'Não perca energias em um exercício',
    rewardBooster: '0',
    rewardEnergy: '0',
    rewardCube: '10',
    rewardXp: '10',
    unlocksOnLevel: '4086d37b-4da5-40a3-915e-bf3b59af15fa',
  },
  {
    name: '100 xp em 1h',
    description: 'Receba 100 pontos de experiência dentro de 1 hora',
    rewardBooster: '1',
    rewardEnergy: '1',
    rewardCube: '20',
    rewardXp: '0',
    unlocksOnLevel: '6bf861ad-8bba-46a3-9f36-265c246eae11',
  }
]

export class seedMissions1699996987982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    missions.forEach(async (missions) => {
      await queryRunner.query(
        `INSERT INTO \"mission\"("name", "description", "rewardBooster", "rewardEnergy", "rewardCube", "rewardXp", "unlocksOnLevel") VALUES('${missions.name}', '${missions.description}', '${missions.rewardBooster}', '${missions.rewardEnergy}', '${missions.rewardCube}', '${missions.rewardXp}', '${missions.unlocksOnLevel}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
