import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691145217112 implements MigrationInterface {
    name = 'EecWeb1691145217112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "application" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "applicationId" SERIAL NOT NULL, "classOrder" integer NOT NULL DEFAULT '1', "classClassId" integer, "userUserId" integer, CONSTRAINT "PK_1f2d89a4ee463862f5e0b16a27e" PRIMARY KEY ("applicationId"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isClassActive"`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_0f40d9f769ea87f446ffbf62878" FOREIGN KEY ("classClassId") REFERENCES "class"("classId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_f7314aab868687a67832b3492c9" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_f7314aab868687a67832b3492c9"`);
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_0f40d9f769ea87f446ffbf62878"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isClassActive" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`DROP TABLE "application"`);
    }

}
