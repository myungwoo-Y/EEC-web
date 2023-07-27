import { MigrationInterface, QueryRunner } from "typeorm";

export class EecWeb1690468886860 implements MigrationInterface {
    name = 'EecWeb1690468886860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e6000a86056eb601e3cedf52298"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_bbd771b0e2056e207dfd477a657"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e6000a86056eb601e3cedf52298" FOREIGN KEY ("lectureLectureId") REFERENCES "lecture"("lectureId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_bbd771b0e2056e207dfd477a657" FOREIGN KEY ("lectureWithReferenceLectureId") REFERENCES "lecture"("lectureId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_bbd771b0e2056e207dfd477a657"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_e6000a86056eb601e3cedf52298"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_bbd771b0e2056e207dfd477a657" FOREIGN KEY ("lectureWithReferenceLectureId") REFERENCES "lecture"("lectureId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_e6000a86056eb601e3cedf52298" FOREIGN KEY ("lectureLectureId") REFERENCES "lecture"("lectureId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
