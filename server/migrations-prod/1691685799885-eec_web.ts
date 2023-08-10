import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691685799885 implements MigrationInterface {
    name = 'EecWeb1691685799885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_82edc242f5bea123d154a238f13"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportReportID"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportRevisedReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportpresentationReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportReportReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPressReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPaperReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_04b4694e0327505df445c9cad79" FOREIGN KEY ("reportRevisedReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ede42fd5038da6213faa4a3e369" FOREIGN KEY ("reportpresentationReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_05cd5ba37e6f722435523a6cd3c" FOREIGN KEY ("reportReportReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_dbdef8fc8fe97726c41248e6c28" FOREIGN KEY ("reportPressReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_5813ce12b001532ee30fe65ea98" FOREIGN KEY ("reportPaperReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_5813ce12b001532ee30fe65ea98"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_dbdef8fc8fe97726c41248e6c28"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_05cd5ba37e6f722435523a6cd3c"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ede42fd5038da6213faa4a3e369"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_04b4694e0327505df445c9cad79"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPaperReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPressReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportReportReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportpresentationReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportRevisedReportID"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_82edc242f5bea123d154a238f13" FOREIGN KEY ("reportReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
