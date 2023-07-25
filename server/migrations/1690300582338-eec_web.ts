import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690300582338 implements MigrationInterface {
    name = 'EecWeb1690300582338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "lectureWithReferenceLectureId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_bbd771b0e2056e207dfd477a657" FOREIGN KEY ("lectureWithReferenceLectureId") REFERENCES "lecture"("lectureId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_bbd771b0e2056e207dfd477a657"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "lectureWithReferenceLectureId"`);
    }

}
