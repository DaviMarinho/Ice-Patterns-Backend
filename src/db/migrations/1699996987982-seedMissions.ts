import { MigrationInterface, QueryRunner } from 'typeorm'

const missions = [
  {
    id: '1',
    name: 'Primeira bateria de exercícios',
    description: 'Complete sua primeira bateria de exercícios com mais de 60% de acerto',
    rewardBooster: '0',
    rewardEnergy: '1',
    rewardCube: '10',
    rewardXp: '0',
    unlocksOnLevel: '1',
  },
  {
    id: '2',
    name: 'ativar booster',
    description: 'Ative e utilize um booster',
    rewardBooster: '0',
    rewardEnergy: '0',
    rewardCube: '5',
    rewardXp: '0',
    unlocksOnLevel: '2',
  },
  {
    id: '3',
    name: 'completar desafio',
    description: 'Complete um desafio com sucesso',
    rewardBooster: '0',
    rewardEnergy: '1',
    rewardCube: '15',
    rewardXp: '0',
    unlocksOnLevel: '2',
  },
  {
    id: '4',
    name: 'completar 2 exercicios com mais de 90% de acerto',
    description: 'Complete duas baterias de exercícios com mais de 90% de acerto',
    rewardBooster: '0',
    rewardEnergy: '0',
    rewardCube: '8',
    rewardXp: '0',
    unlocksOnLevel: '5',
  }
]

export class seedMissions1699996987982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    missions.forEach(async (missions) => {
      await queryRunner.query(
        `INSERT INTO \"mission\"("id", "name", "description", "rewardBooster", "rewardEnergy", "rewardCube", "rewardXp", "unlocksOnLevel") VALUES('${missions.id}', '${missions.name}', '${missions.description}', '${missions.rewardBooster}', '${missions.rewardEnergy}', '${missions.rewardCube}', '${missions.rewardXp}', '${missions.unlocksOnLevel}')`
      )
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
