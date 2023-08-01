import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690737841780 implements MigrationInterface {
    name = 'EecWeb1690737841780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certification" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "certificationId" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "issueNumber" character varying(100) NOT NULL, "description" character varying NOT NULL DEFAULT '', "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "certificationDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fef9aea279e0856710b452d6804" PRIMARY KEY ("certificationId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "certification"`);
    }

}
