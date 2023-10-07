import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1696680318362 implements MigrationInterface {
    name = 'EecWeb1696680318362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "memo" character varying(500) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "memo"`);
    }

}
