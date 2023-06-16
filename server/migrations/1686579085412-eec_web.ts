import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686579085412 implements MigrationInterface {
    name = 'EecWeb1686579085412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_52378a74ae3724bcab44036645b" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "user_id"`);
    }

}
