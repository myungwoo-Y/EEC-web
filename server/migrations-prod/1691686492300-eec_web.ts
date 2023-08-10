import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691686492300 implements MigrationInterface {
    name = 'EecWeb1691686492300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_04b4694e0327505df445c9cad79"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ede42fd5038da6213faa4a3e369"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_05cd5ba37e6f722435523a6cd3c"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_dbdef8fc8fe97726c41248e6c28"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_5813ce12b001532ee30fe65ea98"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME COLUMN "reportID" TO "reportId"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME CONSTRAINT "PK_9591589e4fb7c70badb34e4efa3" TO "PK_afde9e812f5547056a4c378be74"`);
        await queryRunner.query(`ALTER SEQUENCE "report_reportID_seq" RENAME TO "report_reportId_seq"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPaperReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportRevisedReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportpresentationReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportReportReportID"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPressReportID"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportRevisedReportId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportpresentationReportId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportReportReportId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPressReportId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPaperReportId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_915676f77478c2b40ab6b8fa7ed" FOREIGN KEY ("reportRevisedReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_2e78defadac8bf08acf614258e1" FOREIGN KEY ("reportpresentationReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_55e5f9861c27f8019bfd189ea71" FOREIGN KEY ("reportReportReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ca92504184ec5384a059f3efb81" FOREIGN KEY ("reportPressReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_62663dc2a0a43a6fcf747f93647" FOREIGN KEY ("reportPaperReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_62663dc2a0a43a6fcf747f93647"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ca92504184ec5384a059f3efb81"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_55e5f9861c27f8019bfd189ea71"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_2e78defadac8bf08acf614258e1"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_915676f77478c2b40ab6b8fa7ed"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPaperReportId"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportPressReportId"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportReportReportId"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportpresentationReportId"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportRevisedReportId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPressReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportReportReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportpresentationReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportRevisedReportID" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportPaperReportID" integer`);
        await queryRunner.query(`ALTER SEQUENCE "report_reportId_seq" RENAME TO "report_reportID_seq"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME CONSTRAINT "PK_afde9e812f5547056a4c378be74" TO "PK_9591589e4fb7c70badb34e4efa3"`);
        await queryRunner.query(`ALTER TABLE "report" RENAME COLUMN "reportId" TO "reportID"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_5813ce12b001532ee30fe65ea98" FOREIGN KEY ("reportPaperReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_dbdef8fc8fe97726c41248e6c28" FOREIGN KEY ("reportPressReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_05cd5ba37e6f722435523a6cd3c" FOREIGN KEY ("reportReportReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ede42fd5038da6213faa4a3e369" FOREIGN KEY ("reportpresentationReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_04b4694e0327505df445c9cad79" FOREIGN KEY ("reportRevisedReportID") REFERENCES "report"("reportID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
