import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1685380855480 implements MigrationInterface {
    name = 'EecWeb1685380855480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

}
