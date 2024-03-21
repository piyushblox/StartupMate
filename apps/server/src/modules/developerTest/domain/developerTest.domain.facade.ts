import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { DeveloperTest } from './developerTest.model'

import { User } from '../../user/domain'

import { DeveloperRequirement } from '../../developerRequirement/domain'

@Injectable()
export class DeveloperTestDomainFacade {
  constructor(
    @InjectRepository(DeveloperTest)
    private repository: Repository<DeveloperTest>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<DeveloperTest>): Promise<DeveloperTest> {
    return this.repository.save(values)
  }

  async update(
    item: DeveloperTest,
    values: Partial<DeveloperTest>,
  ): Promise<DeveloperTest> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: DeveloperTest): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<DeveloperTest> = {},
  ): Promise<DeveloperTest[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<DeveloperTest> = {},
  ): Promise<DeveloperTest> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<DeveloperTest> = {},
  ): Promise<DeveloperTest[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByDeveloperRequirement(
    item: DeveloperRequirement,
    queryOptions: RequestHelper.QueryOptions<DeveloperTest> = {},
  ): Promise<DeveloperTest[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('developerRequirement')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        developerRequirementId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
