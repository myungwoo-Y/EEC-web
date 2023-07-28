import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690546952799 implements MigrationInterface {
    name = 'EecWeb1690546952799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "classification" TO "role"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'student', 'lecturer')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'student'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "classification"`);
    }

}
