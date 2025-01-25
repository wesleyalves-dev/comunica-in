import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDefaultUser1737846776627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users 
      (id, name, username, password, created_at, updated_at) VALUES 
      ('e8813504-444c-4a34-af4a-6ece9206cc9e', 'John Doe', 'john.doe', '$2a$10$yZEv0L32fbQ3cEnmhd/0pOjfY/hxUd2wF/rMqT7Myk4OytgOGyKcu', '2023-08-15 00:00:00', '2023-08-15 00:00:00')`
    )
  }

  public async down(): Promise<void> {}
}
