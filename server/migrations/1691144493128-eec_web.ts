import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691144493128 implements MigrationInterface {
    name = 'EecWeb1691144493128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7a4a614e0aca725fd34b34f1ca1"`);
        await queryRunner.query(`CREATE TABLE "user_classes_class" ("userUserId" integer NOT NULL, "classClassId" integer NOT NULL, CONSTRAINT "PK_a576c332c9e45a19088435995d5" PRIMARY KEY ("userUserId", "classClassId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f3dc757fc317223ca9938170d" ON "user_classes_class" ("userUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9513bf8a1059611992bb3ce6b0" ON "user_classes_class" ("classClassId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "classClassId"`);
        await queryRunner.query(`ALTER TABLE "user_classes_class" ADD CONSTRAINT "FK_7f3dc757fc317223ca9938170d7" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_classes_class" ADD CONSTRAINT "FK_9513bf8a1059611992bb3ce6b0a" FOREIGN KEY ("classClassId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_classes_class" DROP CONSTRAINT "FK_9513bf8a1059611992bb3ce6b0a"`);
        await queryRunner.query(`ALTER TABLE "user_classes_class" DROP CONSTRAINT "FK_7f3dc757fc317223ca9938170d7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "classClassId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9513bf8a1059611992bb3ce6b0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f3dc757fc317223ca9938170d"`);
        await queryRunner.query(`DROP TABLE "user_classes_class"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7a4a614e0aca725fd34b34f1ca1" FOREIGN KEY ("classClassId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
