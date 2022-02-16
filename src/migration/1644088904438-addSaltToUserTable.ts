import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaltToUserTable1644088904438 implements MigrationInterface {
  name = 'AddSaltToUserTable1644088904438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "salt" character varying(255) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "salt"
        `);
  }
}
