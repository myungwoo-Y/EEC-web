import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688911373811 implements MigrationInterface {
    name = 'EecWeb1688911373811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "classOrder"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "classOrder" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "classOrder"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "classOrder" character varying(50) NOT NULL DEFAULT ''`);
    }

}
