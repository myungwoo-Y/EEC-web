import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691685557658 implements MigrationInterface {
    name = 'EecWeb1691685557658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f8c5bc67925f950f744f57619f2"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "reportLectureId" TO "reportReportID"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_82edc242f5bea123d154a238f13" FOREIGN KEY ("reportReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_82edc242f5bea123d154a238f13"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "reportReportID" TO "reportLectureId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f8c5bc67925f950f744f57619f2" FOREIGN KEY ("reportLectureId") REFERENCES "lecture"("lectureId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
