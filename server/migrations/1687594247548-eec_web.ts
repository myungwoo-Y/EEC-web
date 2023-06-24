import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1687594247548 implements MigrationInterface {
    name = 'EecWeb1687594247548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "job_level"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "class_order"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "agreement_terms"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "jobLevel" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "classOrder" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ADD "agreementTerms" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "classification" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "department" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "department" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "classification" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "agreementTerms"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "classOrder"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "jobLevel"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "agreement_terms" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "class_order" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "job_level" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "phone_number" character varying(50) NOT NULL`);
    }

}
