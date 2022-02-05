import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdmin1644088904439 implements MigrationInterface {
  name = 'AddAdmin1644088904439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user"
      ("name", "login", "password")
      VALUES (
        'admin',
        'admin',
        'admin'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user"
            WHERE "login"='admin'
        `);
  }
}
