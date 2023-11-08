import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699405509698 implements MigrationInterface {
    name = 'Default1699405509698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sublevel" ("id" character varying NOT NULL, "numSublevel" integer NOT NULL, "numLevel" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aff07a66e8c53a3beaee172c44b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "rewardBooster" integer NOT NULL, "rewardEnergy" integer NOT NULL, "rewardCube" integer NOT NULL, "rewardXp" integer NOT NULL, "unlocksOnLevel" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_mission" ("userUsername" character varying NOT NULL, "missionId" uuid NOT NULL, "progress" integer NOT NULL, "dateTimeStarted" TIMESTAMP WITH TIME ZONE NOT NULL, "dateTimeCompleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0eaba265d7be38f02bcf3189bf6" PRIMARY KEY ("userUsername", "missionId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "qtBooster" integer NOT NULL DEFAULT '0', "qtEnergy" integer NOT NULL DEFAULT '0', "qtCube" integer NOT NULL DEFAULT '0', "qtXpOnLevel" integer NOT NULL DEFAULT '0', "qtXpTotal" integer NOT NULL DEFAULT '0', "sublevelId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "user_achievement" ("userUsername" character varying NOT NULL, "achievementId" uuid NOT NULL, "dateTime" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_11e67d0fd2f6aa40e352ebd0b6e" PRIMARY KEY ("userUsername", "achievementId"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tipo" character varying NOT NULL, "enunciado" character varying NOT NULL, "chaveOrdenacao" integer NOT NULL, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "cubeReward" integer NOT NULL, "energyReward" integer NOT NULL, "unlocksOnLevel" character varying NOT NULL, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_mission" ADD CONSTRAINT "FK_7843b263d50351a1cfb2c85ef32" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_mission" ADD CONSTRAINT "FK_3c4244c6a407e751dde4cb0aa3d" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_62a786882a0617443f2ef0e0a3d" FOREIGN KEY ("sublevelId") REFERENCES "sublevel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_achievement" ADD CONSTRAINT "FK_5c09d517213c4b6566db068a00b" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_achievement" ADD CONSTRAINT "FK_843ecd1965f1aac694875674a18" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_achievement" DROP CONSTRAINT "FK_843ecd1965f1aac694875674a18"`);
        await queryRunner.query(`ALTER TABLE "user_achievement" DROP CONSTRAINT "FK_5c09d517213c4b6566db068a00b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_62a786882a0617443f2ef0e0a3d"`);
        await queryRunner.query(`ALTER TABLE "user_mission" DROP CONSTRAINT "FK_3c4244c6a407e751dde4cb0aa3d"`);
        await queryRunner.query(`ALTER TABLE "user_mission" DROP CONSTRAINT "FK_7843b263d50351a1cfb2c85ef32"`);
        await queryRunner.query(`DROP TABLE "quest"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "user_achievement"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_mission"`);
        await queryRunner.query(`DROP TABLE "mission"`);
        await queryRunner.query(`DROP TABLE "sublevel"`);
    }

}
