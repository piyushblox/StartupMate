import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { TutorialInteraction } from './tutorialInteraction.model'

import { Tutorial } from '../../tutorial/domain'

import { User } from '../../user/domain'

@Injectable()
export class TutorialInteractionDomainFacade {
  constructor(
    @InjectRepository(TutorialInteraction)
    private repository: Repository<TutorialInteraction>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    return this.repository.save(values)
  }

  async update(
    item: TutorialInteraction,
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: TutorialInteraction): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<TutorialInteraction> = {},
  ): Promise<TutorialInteraction[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<TutorialInteraction> = {},
  ): Promise<TutorialInteraction> {
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

  async findManyByTutorial(
    item: Tutorial,
    queryOptions: RequestHelper.QueryOptions<TutorialInteraction> = {},
  ): Promise<TutorialInteraction[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('tutorial')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        tutorialId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<TutorialInteraction> = {},
  ): Promise<TutorialInteraction[]> {
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
}
