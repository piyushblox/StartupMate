import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { CommunityMessage } from './communityMessage.model'

export class CommunityMessageApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<CommunityMessage>,
  ): Promise<CommunityMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/communityMessages${buildOptions}`)
  }

  static findOne(
    communityMessageId: string,
    queryOptions?: ApiHelper.QueryOptions<CommunityMessage>,
  ): Promise<CommunityMessage> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/communityMessages/${communityMessageId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<CommunityMessage>,
  ): Promise<CommunityMessage> {
    return HttpService.api.post(`/v1/communityMessages`, values)
  }

  static updateOne(
    communityMessageId: string,
    values: Partial<CommunityMessage>,
  ): Promise<CommunityMessage> {
    return HttpService.api.patch(
      `/v1/communityMessages/${communityMessageId}`,
      values,
    )
  }

  static deleteOne(communityMessageId: string): Promise<void> {
    return HttpService.api.delete(`/v1/communityMessages/${communityMessageId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<CommunityMessage>,
  ): Promise<CommunityMessage[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/communityMessages${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<CommunityMessage>,
  ): Promise<CommunityMessage> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/communityMessages`,
      values,
    )
  }
}
