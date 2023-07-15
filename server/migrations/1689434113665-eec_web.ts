import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1689434113665 implements MigrationInterface {
    name = 'EecWeb1689434113665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lecture" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "lectureId" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(50) NOT NULL, "lecturer" character varying(50) NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "intro" character varying(1000) NOT NULL, "lectureLink" character varying(2048) NOT NULL, "evaluateStartDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "evaluateEndDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "evaluateLink" character varying(2048) NOT NULL, "lecturerEvaluateStartDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lecturerEvaluateEndDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lecturerEvaluateLink" character varying(2048) NOT NULL, "adminId" integer, "classId" integer, "curriculumId" integer, CONSTRAINT "PK_63c417932ee119cdadd9206b541" PRIMARY KEY ("lectureId"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD "lectureLectureId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e6000a86056eb601e3cedf52298" FOREIGN KEY ("lectureLectureId") REFERENCES "lecture"("lectureId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_67d11fda9bf7fa17afaf4287f23" FOREIGN KEY ("adminId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_9fc341b5b34406bc63463fb075c" FOREIGN KEY ("classId") REFERENCES "class"("classId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lecture" ADD CONSTRAINT "FK_ed25d36b0c0e8ed6bbff53b3119" FOREIGN KEY ("curriculumId") REFERENCES "curriculum"("curriculumId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_ed25d36b0c0e8ed6bbff53b3119"`);
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_9fc341b5b34406bc63463fb075c"`);
        await queryRunner.query(`ALTER TABLE "lecture" DROP CONSTRAINT "FK_67d11fda9bf7fa17afaf4287f23"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e6000a86056eb601e3cedf52298"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "lectureLectureId"`);
        await queryRunner.query(`DROP TABLE "lecture"`);
    }

}
