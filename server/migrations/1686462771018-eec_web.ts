import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686462771018 implements MigrationInterface {
    name = 'EecWeb1686462771018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "UQ_42f1dad0993489f574bfad5d3ef" UNIQUE ("category_id")`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_42f1dad0993489f574bfad5d3ef" FOREIGN KEY ("category_id") REFERENCES "board_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_42f1dad0993489f574bfad5d3ef"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "UQ_42f1dad0993489f574bfad5d3ef"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "category_id"`);
    }

}
