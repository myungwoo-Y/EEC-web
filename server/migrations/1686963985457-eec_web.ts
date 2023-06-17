import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686963985457 implements MigrationInterface {
    name = 'EecWeb1686963985457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "post_id" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "post_id"`);
    }

}
