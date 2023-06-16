import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686579285655 implements MigrationInterface {
    name = 'EecWeb1686579285655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "REL_388636ba602c312da6026dc9db"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "post_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "REL_388636ba602c312da6026dc9db" UNIQUE ("category_id")`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "post_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
