import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1696947631454 implements MigrationInterface {
    name = 'EecWeb1696947631454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "simple_report" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "simpleReportId" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "submitDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_5823b3dd698f3f9585b66c96c4d" PRIMARY KEY ("simpleReportId"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "simpleReportSimpleReportId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_ffb4a00fc16bb66bcda2283119b" UNIQUE ("simpleReportSimpleReportId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ffb4a00fc16bb66bcda2283119b" FOREIGN KEY ("simpleReportSimpleReportId") REFERENCES "simple_report"("simpleReportId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ffb4a00fc16bb66bcda2283119b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_ffb4a00fc16bb66bcda2283119b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "simpleReportSimpleReportId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`DROP TABLE "simple_report"`);
    }

}
