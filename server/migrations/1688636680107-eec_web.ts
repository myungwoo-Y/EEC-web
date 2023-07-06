import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688636680107 implements MigrationInterface {
    name = 'EecWeb1688636680107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "target" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "target"`);
    }

}
