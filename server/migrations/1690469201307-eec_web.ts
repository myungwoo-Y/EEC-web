import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690469201307 implements MigrationInterface {
    name = 'EecWeb1690469201307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateStartDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateEndDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateStartDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateEndDate" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateEndDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateStartDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateEndDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateStartDate" SET DEFAULT now()`);
    }

}
