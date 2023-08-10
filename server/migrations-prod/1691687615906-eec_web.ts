import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691687615906 implements MigrationInterface {
    name = 'EecWeb1691687615906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_43fd474c376a816721644e722ae" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_43fd474c376a816721644e722ae"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "userUserId"`);
    }

}
