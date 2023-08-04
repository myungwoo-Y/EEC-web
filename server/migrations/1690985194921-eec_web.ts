import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690985194921 implements MigrationInterface {
    name = 'EecWeb1690985194921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "classClassId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7a4a614e0aca725fd34b34f1ca1" FOREIGN KEY ("classClassId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7a4a614e0aca725fd34b34f1ca1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "classClassId"`);
    }

}
