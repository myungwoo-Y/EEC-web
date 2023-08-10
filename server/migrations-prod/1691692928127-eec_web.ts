import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691692928127 implements MigrationInterface {
    name = 'EecWeb1691692928127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_2e78defadac8bf08acf614258e1"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "reportpresentationReportId" TO "reportPresentationReportId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_fea8fce41ba0bf219b3b2072fb9" FOREIGN KEY ("reportPresentationReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_fea8fce41ba0bf219b3b2072fb9"`);
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "reportPresentationReportId" TO "reportpresentationReportId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_2e78defadac8bf08acf614258e1" FOREIGN KEY ("reportpresentationReportId") REFERENCES "report"("reportId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
