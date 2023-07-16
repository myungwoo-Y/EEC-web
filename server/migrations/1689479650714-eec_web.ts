import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1689479650714 implements MigrationInterface {
    name = 'EecWeb1689479650714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "author" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturer" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "intro" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lectureLink" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateLink" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateLink" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturerEvaluateLink" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "evaluateLink" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lectureLink" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "intro" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "lecturer" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "lecture" ALTER COLUMN "author" DROP DEFAULT`);
    }

}
