import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688803825442 implements MigrationInterface {
    name = 'EecWeb1688803825442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54" FOREIGN KEY ("classId") REFERENCES "class"("classId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e747d6c94afa31f22a973ea9b54" FOREIGN KEY ("classId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
