import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { CommunityMessage } from './communityMessage.model'

import { User } from '../../user/domain'

@Injectable()
export class CommunityMessageDomainFacade {
  constructor(
    @InjectRepository(CommunityMessage)
    private repository: Repository<CommunityMessage>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<CommunityMessage>): Promise<CommunityMessage> {
    return this.repository.save(values)
  }

  async update(
    item: CommunityMessage,
    values: Partial<CommunityMessage>,
  ): Promise<CommunityMessage> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: CommunityMessage): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<CommunityMessage> = {},
  ): Promise<CommunityMessage[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<CommunityMessage> = {},
  ): Promise<CommunityMessage> {
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
    queryOptions: RequestHelper.QueryOptions<CommunityMessage> = {},
  ): Promise<CommunityMessage[]> {
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
