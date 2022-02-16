import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdmin1644088904439 implements MigrationInterface {
  name = 'AddAdmin1644088904439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "user"
      ("name", "login", "password", "salt")
      VALUES (
        'admin',
        'admin',
        '$2b$10$9K8h3srKgNUTS6bc/c36jOzg2.WSFbhEWn3JHx/mIcVcq.afzG7.S',
        '$2b$10$9K8h3srKgNUTS6bc/c36jO'
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
