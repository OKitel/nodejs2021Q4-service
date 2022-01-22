import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1642362864431 implements MigrationInterface {
    name = 'FirstMigration1642362864431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP COLUMN "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD "boardId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"
        `);
        await queryRunner.query(`
            ALTER TABLE "board" DROP CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1"
        `);
        await queryRunner.query(`
            ALTER TABLE "board" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "board"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "board"
            ADD CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "userId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "boardId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "columnId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "columnId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "board_column"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "columnId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "columnId" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "boardId" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "userId"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "userId" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"
        `);
        await queryRunner.query(`
            ALTER TABLE "task" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD "id" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "board" DROP CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1"
        `);
        await queryRunner.query(`
            ALTER TABLE "board" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "board"
            ADD "id" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "board"
            ADD CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP COLUMN "boardId"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD "boardId" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD "id" character varying(40) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "board_column"
            ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "task"
            ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "board_column"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
