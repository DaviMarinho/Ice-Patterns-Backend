import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699405509698 implements MigrationInterface {
    name = 'Default1699405509698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "title" character varying NOT NULL, "position" integer NOT NULL, "sublevelId" character varying, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alternative" ("num" character varying NOT NULL, "exerciseId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "isAnswer" boolean NOT NULL, CONSTRAINT "PK_eef33303e210fefb3d30edf043a" PRIMARY KEY ("num", "exerciseId"))`);
        await queryRunner.query(`CREATE TABLE "user_exercise" ("userUsername" character varying NOT NULL, "exerciseId" character varying NOT NULL, "dateTime" TIMESTAMP WITH TIME ZONE NOT NULL, "qtAttempts" integer NOT NULL, "qtRights" integer NOT NULL, CONSTRAINT "PK_77b1196094f438e4748a731b358" PRIMARY KEY ("userUsername", "exerciseId"))`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "type" "public"."exercise_type_enum" NOT NULL, "question" character varying NOT NULL, "orderKey" integer NOT NULL, "sublevelId" character varying, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sublevel" ("id" character varying NOT NULL, "numSublevel" integer NOT NULL, "numLevel" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aff07a66e8c53a3beaee172c44b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "rewardBooster" integer NOT NULL, "rewardEnergy" integer NOT NULL, "rewardCube" integer NOT NULL, "rewardXp" integer NOT NULL, "unlocksOnLevel" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_mission" ("userUsername" character varying NOT NULL, "missionId" character varying NOT NULL, "progress" integer NOT NULL, "dateTimeStarted" TIMESTAMP WITH TIME ZONE NOT NULL, "dateTimeCompleted" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_0eaba265d7be38f02bcf3189bf6" PRIMARY KEY ("userUsername", "missionId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("username" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "qtBooster" integer NOT NULL DEFAULT '0', "qtEnergy" integer NOT NULL DEFAULT '5', "qtCube" integer NOT NULL DEFAULT '0', "qtXpOnLevel" integer NOT NULL DEFAULT '0', "qtXpTotal" integer NOT NULL DEFAULT '0', "boosterActive" boolean NOT NULL DEFAULT false, "boosterActiveDateTime" TIMESTAMP WITH TIME ZONE, "boosterDeactiveDateTime" TIMESTAMP WITH TIME ZONE, "sublevelId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_78a916df40e02a9deb1c4b75edb" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "user_achievement" ("userUsername" character varying NOT NULL, "achievementId" character varying NOT NULL, "dateTime" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_11e67d0fd2f6aa40e352ebd0b6e" PRIMARY KEY ("userUsername", "achievementId"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_5fb0c281114efd15b0257b2654e" FOREIGN KEY ("sublevelId") REFERENCES "sublevel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alternative" ADD CONSTRAINT "FK_59fd55b128618b9f8cfac984aec" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_exercise" ADD CONSTRAINT "FK_978e5f4800d446fe423ef32cc38" FOREIGN KEY ("userUsername") REFERENCES "user"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_exercise" ADD CONSTRAINT "FK_90e40a3c00165b887015120c445" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_2767c0a604a225a0401300adc1a" FOREIGN KEY ("sublevelId") REFERENCES "sublevel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_2767c0a604a225a0401300adc1a"`);
        await queryRunner.query(`ALTER TABLE "user_exercise" DROP CONSTRAINT "FK_90e40a3c00165b887015120c445"`);
        await queryRunner.query(`ALTER TABLE "user_exercise" DROP CONSTRAINT "FK_978e5f4800d446fe423ef32cc38"`);
        await queryRunner.query(`ALTER TABLE "alternative" DROP CONSTRAINT "FK_59fd55b128618b9f8cfac984aec"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_5fb0c281114efd15b0257b2654e"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "user_achievement"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_mission"`);
        await queryRunner.query(`DROP TABLE "mission"`);
        await queryRunner.query(`DROP TABLE "sublevel"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_exercise"`);
        await queryRunner.query(`DROP TABLE "alternative"`);
        await queryRunner.query(`DROP TABLE "content"`);
    }

}
