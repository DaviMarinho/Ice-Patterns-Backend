import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697485191056 implements MigrationInterface {
    name = 'Default1697485191056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "cubeReward" integer NOT NULL, "energyReward" integer NOT NULL, "unlocksOnLevel" character varying NOT NULL, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tipo" character varying NOT NULL, "enunciado" character varying NOT NULL, "chaveOrdenacao" integer NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "qtBooster" integer NOT NULL DEFAULT '0', "qtEnergy" integer NOT NULL DEFAULT '0', "qtCube" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "user_achievements_achievement" ("userUsername" character varying NOT NULL, "achievementId" uuid NOT NULL, CONSTRAINT "PK_0be8f8b7734fb4d19c45c7df83d" PRIMARY KEY ("userUsername", "achievementId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7ad8291e3c62e7ada41a2286d0" ON "user_achievements_achievement" ("userUsername") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d243f5af5248715ac8c4810dc" ON "user_achievements_achievement" ("achievementId") `);
        await queryRunner.query(`ALTER TABLE "user_achievements_achievement" ADD CONSTRAINT "FK_7ad8291e3c62e7ada41a2286d05" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_achievements_achievement" ADD CONSTRAINT "FK_9d243f5af5248715ac8c4810dc5" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_achievements_achievement" DROP CONSTRAINT "FK_9d243f5af5248715ac8c4810dc5"`);
        await queryRunner.query(`ALTER TABLE "user_achievements_achievement" DROP CONSTRAINT "FK_7ad8291e3c62e7ada41a2286d05"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d243f5af5248715ac8c4810dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ad8291e3c62e7ada41a2286d0"`);
        await queryRunner.query(`DROP TABLE "user_achievements_achievement"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "quest"`);
    }

}
