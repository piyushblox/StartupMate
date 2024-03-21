import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { TestQuestion } from './testQuestion.model'

import { DeveloperRequirement } from '../../developerRequirement/domain'

@Injectable()
export class TestQuestionDomainFacade {
  constructor(
    @InjectRepository(TestQuestion)
    private repository: Repository<TestQuestion>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<TestQuestion>): Promise<TestQuestion> {
    return this.repository.save(values)
  }

  async update(
    item: TestQuestion,
    values: Partial<TestQuestion>,
  ): Promise<TestQuestion> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: TestQuestion): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<TestQuestion> = {},
  ): Promise<TestQuestion[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<TestQuestion> = {},
  ): Promise<TestQuestion> {
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

  async findManyByDeveloperRequirement(
    item: DeveloperRequirement,
    queryOptions: RequestHelper.QueryOptions<TestQuestion> = {},
  ): Promise<TestQuestion[]> {
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
