import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690468749805 implements MigrationInterface {
    name = 'EecWeb1690468749805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateStartDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateEndDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateStartDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateEndDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateEndDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateStartDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateEndDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateStartDate" SET NOT NULL`);
    }

}
