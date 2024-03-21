import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { StartupProfile } from './startupProfile.model'

export class StartupProfileApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<StartupProfile>,
  ): Promise<StartupProfile[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/startupProfiles${buildOptions}`)
  }

  static findOne(
    startupProfileId: string,
    queryOptions?: ApiHelper.QueryOptions<StartupProfile>,
  ): Promise<StartupProfile> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/startupProfiles/${startupProfileId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<StartupProfile>): Promise<StartupProfile> {
    return HttpService.api.post(`/v1/startupProfiles`, values)
  }

  static updateOne(
    startupProfileId: string,
    values: Partial<StartupProfile>,
  ): Promise<StartupProfile> {
    return HttpService.api.patch(
      `/v1/startupProfiles/${startupProfileId}`,
      values,
    )
  }

  static deleteOne(startupProfileId: string): Promise<void> {
    return HttpService.api.delete(`/v1/startupProfiles/${startupProfileId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<StartupProfile>,
  ): Promise<StartupProfile[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/startupProfiles${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<StartupProfile>,
  ): Promise<StartupProfile> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/startupProfiles`,
      values,
    )
  }
}
