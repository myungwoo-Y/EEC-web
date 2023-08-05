import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691198305299 implements MigrationInterface {
    name = 'EecWeb1691198305299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "contents" TO "content"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "content" TO "contents"`);
    }

}
