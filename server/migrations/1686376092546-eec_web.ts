import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686376092546 implements MigrationInterface {
    name = 'EecWeb1686376092546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdBy" DROP DEFAULT`);
    }

}
