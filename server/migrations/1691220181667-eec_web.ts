import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691220181667 implements MigrationInterface {
    name = 'EecWeb1691220181667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a" FOREIGN KEY ("postPostId") REFERENCES "post"("postId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a" FOREIGN KEY ("postPostId") REFERENCES "post"("postId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
