import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1691197583705 implements MigrationInterface {
    name = 'EecWeb1691197583705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "commentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "contents" character varying(500) NOT NULL, "userUserId" integer, "postPostId" integer, CONSTRAINT "PK_1b03586f7af11eac99f4fdbf012" PRIMARY KEY ("commentId"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1a0a9c69d17cfb196d090858bc8" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a" FOREIGN KEY ("postPostId") REFERENCES "post"("postId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_58c08bd38052e10706d3b4ae89a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1a0a9c69d17cfb196d090858bc8"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
