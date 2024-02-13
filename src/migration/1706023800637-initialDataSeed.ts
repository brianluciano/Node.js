import { MigrationInterface, QueryRunner } from 'typeorm';
import Role from '../entity/Role';
import { UserRoleSeed } from '../seeder/roles.seed';

export class initialDataSeed1706023800637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRoleSeed = UserRoleSeed;
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('role')
      .values(userRoleSeed)
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(Role)
      .execute();
  }
}
