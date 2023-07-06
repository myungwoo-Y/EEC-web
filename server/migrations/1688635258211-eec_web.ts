import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688635258211 implements MigrationInterface {
    name = 'EecWeb1688635258211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "class" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "class" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "class" ADD "createdBy" character varying(300) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "class" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "class" ADD "lastChangedBy" character varying(300) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "file" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "file" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "file" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "file" ADD "createdBy" character varying(300) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "file" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "file" ADD "lastChangedBy" character varying(300) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "isActive"`);
    }

}
