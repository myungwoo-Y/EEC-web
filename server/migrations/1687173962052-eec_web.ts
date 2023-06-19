import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1687173962052 implements MigrationInterface {
    name = 'EecWeb1687173962052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "is_open" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "is_open"`);
    }

}
