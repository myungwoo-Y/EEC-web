import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691683724734 implements MigrationInterface {
    name = 'EecWeb1691683724734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "reportID" SERIAL NOT NULL, "basis" text NOT NULL, "year" character varying(50) NOT NULL, "quarter" character varying(50) NOT NULL, "certificationDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9591589e4fb7c70badb34e4efa3" PRIMARY KEY ("reportID"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD "reportLectureId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f8c5bc67925f950f744f57619f2" FOREIGN KEY ("reportLectureId") REFERENCES "lecture"("lectureId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f8c5bc67925f950f744f57619f2"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "reportLectureId"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
