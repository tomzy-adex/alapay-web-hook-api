import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageToHmo1705312800000 implements MigrationInterface {
  name = 'AddImageToHmo1705312800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "hmos" 
      ADD COLUMN "image" TEXT
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "hmos" 
      DROP COLUMN "image"
    `);
  }
} 