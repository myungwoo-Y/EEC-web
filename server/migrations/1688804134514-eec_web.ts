import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1688804134514 implements MigrationInterface {
    name = 'EecWeb1688804134514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593"`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593" FOREIGN KEY ("thumbnailImageId") REFERENCES "file"("fileId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593"`);
        await queryRunner.query(`ALTER TABLE "class" ADD CONSTRAINT "FK_78ebfb305f7dfebe9aa5d54b593" FOREIGN KEY ("thumbnailImageId") REFERENCES "file"("fileId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
