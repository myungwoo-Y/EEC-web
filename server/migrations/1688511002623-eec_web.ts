import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688511002623 implements MigrationInterface {
    name = 'EecWeb1688511002623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "class" ("classId" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying NOT NULL DEFAULT '', "detail" text NOT NULL DEFAULT '', "classStart" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "classEnd" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerStart" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registerEnd" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "thumbnailImageId" uuid, CONSTRAINT "REL_78ebfb305f7dfebe9aa5d54b59" UNIQUE ("thumbnailImageId"), CONSTRAINT "PK_72719a39cdc7740c53d96c716bd" PRIMARY KEY ("classId"))`);
        await queryRunner.query(`ALTER TABLE "file" ADD "classId" integer`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "UQ_e747d6c94afa31f22a973ea9b54" UNIQUE ("classId")`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593" FOREIGN KEY ("thumbnailImageId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54" FOREIGN KEY ("classId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "UQ_e747d6c94afa31f22a973ea9b54"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "classId"`);
        await queryRunner.query(`DROP TABLE "class"`);
    }

}
