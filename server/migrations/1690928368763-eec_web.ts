import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690928368763 implements MigrationInterface {
    name = 'EecWeb1690928368763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" ADD "type" character varying NOT NULL DEFAULT 'normal'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification" DROP COLUMN "type"`);
    }

}
