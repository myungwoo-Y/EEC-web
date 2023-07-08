import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688806908198 implements MigrationInterface {
    name = 'EecWeb1688806908198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593"`);
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "REL_78ebfb305f7dfebe9aa5d54b59"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "thumbnailImageId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ADD "thumbnailImageId" uuid`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "REL_78ebfb305f7dfebe9aa5d54b59" UNIQUE ("thumbnailImageId")`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593" FOREIGN KEY ("thumbnailImageId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
