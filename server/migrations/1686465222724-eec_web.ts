import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1686465222724 implements MigrationInterface {
    name = 'EecWeb1686465222724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "internalComment" character varying(300), "name" character varying(50) NOT NULL, CONSTRAINT "PK_388636ba602c312da6026dc9dbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT '', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT '', "internalComment" character varying(300), "content" text NOT NULL, "title" character varying(50) NOT NULL, "viewCount" integer NOT NULL DEFAULT '0', "category_id" uuid, CONSTRAINT "REL_388636ba602c312da6026dc9db" UNIQUE ("category_id"), CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_388636ba602c312da6026dc9dbc" FOREIGN KEY ("category_id") REFERENCES "post_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_388636ba602c312da6026dc9dbc"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "post_category"`);
    }

}
