import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1737679876732 implements MigrationInterface {
  private readonly tableName = 'users'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            primaryKeyConstraintName: 'pk_user_id'
          },
          {
            name: 'name',
            type: 'text',
            isNullable: false
          },
          {
            name: 'username',
            type: 'text',
            isNullable: false
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false
          }
        ],
        uniques: [
          {
            name: 'un_user_username',
            columnNames: ['username']
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true, true, true)
  }
}
