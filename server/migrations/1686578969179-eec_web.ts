import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686578969179 implements MigrationInterface {
    name = 'EecWeb1686578969179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "is_answer" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "is_answer"`);
    }

}
