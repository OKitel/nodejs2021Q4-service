import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFileTable1644159747271 implements MigrationInterface {
  name = 'addFileTable1644159747271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "file" (
                "generatedName" character varying(1024) NOT NULL,
                "originalName" character varying(1024) NOT NULL,
                CONSTRAINT "PK_b7345e9c10da7d365dd3038230a" PRIMARY KEY ("generatedName")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "file"
        `);
  }
}
