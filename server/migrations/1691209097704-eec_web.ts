import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691209097704 implements MigrationInterface {
    name = 'EecWeb1691209097704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b" FOREIGN KEY ("postId") REFERENCES "post"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_f0f2188b3e254ad31ba2b95ec4b" FOREIGN KEY ("postId") REFERENCES "post"("postId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
