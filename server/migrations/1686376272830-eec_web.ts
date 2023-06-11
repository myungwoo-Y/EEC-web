import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686376272830 implements MigrationInterface {
    name = 'EecWeb1686376272830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastChangedBy" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastChangedBy" DROP DEFAULT`);
    }

}
