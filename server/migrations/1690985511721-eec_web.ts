import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690985511721 implements MigrationInterface {
    name = 'EecWeb1690985511721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isClassActive" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isClassActive"`);
    }

}
