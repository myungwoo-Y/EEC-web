import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690739686794 implements MigrationInterface {
    name = 'EecWeb1690739686794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "certification_users_user" ("certificationCertificationId" integer NOT NULL, "userUserId" integer NOT NULL, CONSTRAINT "PK_d77af052cb117085b0c09ed0067" PRIMARY KEY ("certificationCertificationId", "userUserId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ce74e5d8e54a07a0e9cb6c7c45" ON "certification_users_user" ("certificationCertificationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b97f9e96ad67f44ca3294dc97c" ON "certification_users_user" ("userUserId") `);
        await queryRunner.query(`ALTER TABLE "certification_users_user" ADD CONSTRAINT "FK_ce74e5d8e54a07a0e9cb6c7c45f" FOREIGN KEY ("certificationCertificationId") REFERENCES "certification"("certificationId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "certification_users_user" ADD CONSTRAINT "FK_b97f9e96ad67f44ca3294dc97ce" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certification_users_user" DROP CONSTRAINT "FK_b97f9e96ad67f44ca3294dc97ce"`);
        await queryRunner.query(`ALTER TABLE "certification_users_user" DROP CONSTRAINT "FK_ce74e5d8e54a07a0e9cb6c7c45f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b97f9e96ad67f44ca3294dc97c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ce74e5d8e54a07a0e9cb6c7c45"`);
        await queryRunner.query(`DROP TABLE "certification_users_user"`);
    }

}
