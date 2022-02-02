import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1642796011937 implements MigrationInterface {
    name = 'FirstMigration1642796011937'

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
