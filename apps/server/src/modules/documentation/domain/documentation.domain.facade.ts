import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Documentation } from './documentation.model'

import { StartupProfile } from '../../startupProfile/domain'

@Injectable()
export class DocumentationDomainFacade {
  constructor(
    @InjectRepository(Documentation)
    private repository: Repository<Documentation>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Documentation>): Promise<Documentation> {
    return this.repository.save(values)
  }

  async update(
    item: Documentation,
    values: Partial<Documentation>,
  ): Promise<Documentation> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Documentation): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Documentation> = {},
  ): Promise<Documentation[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Documentation> = {},
  ): Promise<Documentation> {
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

  async findManyByStartupProfile(
    item: StartupProfile,
    queryOptions: RequestHelper.QueryOptions<Documentation> = {},
  ): Promise<Documentation[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('startupProfile')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        startupProfileId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
