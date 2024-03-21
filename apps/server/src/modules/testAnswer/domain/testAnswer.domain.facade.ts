import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { TestAnswer } from './testAnswer.model'

import { TestQuestion } from '../../testQuestion/domain'

@Injectable()
export class TestAnswerDomainFacade {
  constructor(
    @InjectRepository(TestAnswer)
    private repository: Repository<TestAnswer>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<TestAnswer>): Promise<TestAnswer> {
    return this.repository.save(values)
  }

  async update(
    item: TestAnswer,
    values: Partial<TestAnswer>,
  ): Promise<TestAnswer> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: TestAnswer): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<TestAnswer> = {},
  ): Promise<TestAnswer[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<TestAnswer> = {},
  ): Promise<TestAnswer> {
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

  async findManyByQuestion(
    item: TestQuestion,
    queryOptions: RequestHelper.QueryOptions<TestAnswer> = {},
  ): Promise<TestAnswer[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('question')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        questionId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
