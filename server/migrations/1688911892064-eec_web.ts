import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688911892064 implements MigrationInterface {
    name = 'EecWeb1688911892064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "curriculum" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "curriculumId" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "classOrder" integer NOT NULL DEFAULT '1', "classId" integer, CONSTRAINT "PK_267ae429fe6e797c3c401efba3b" PRIMARY KEY ("curriculumId"))`);
        await queryRunner.query(`ALTER TABLE "curriculum" ADD CONSTRAINT "FK_3e9dd784220d3d393a75cf20599" FOREIGN KEY ("classId") REFERENCES "class"("classId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "curriculum" DROP CONSTRAINT "FK_3e9dd784220d3d393a75cf20599"`);
        await queryRunner.query(`DROP TABLE "curriculum"`);
    }

}
