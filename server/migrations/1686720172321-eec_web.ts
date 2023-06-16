import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686720172321 implements MigrationInterface {
    name = 'EecWeb1686720172321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_category" ADD "category_id" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_category" DROP COLUMN "category_id"`);
    }

}
