import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Documentation } from './documentation.model'

export class DocumentationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Documentation>,
  ): Promise<Documentation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/documentations${buildOptions}`)
  }

  static findOne(
    documentationId: string,
    queryOptions?: ApiHelper.QueryOptions<Documentation>,
  ): Promise<Documentation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/documentations/${documentationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Documentation>): Promise<Documentation> {
    return HttpService.api.post(`/v1/documentations`, values)
  }

  static updateOne(
    documentationId: string,
    values: Partial<Documentation>,
  ): Promise<Documentation> {
    return HttpService.api.patch(
      `/v1/documentations/${documentationId}`,
      values,
    )
  }

  static deleteOne(documentationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/documentations/${documentationId}`)
  }

  static findManyByStartupProfileId(
    startupProfileId: string,
    queryOptions?: ApiHelper.QueryOptions<Documentation>,
  ): Promise<Documentation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/startupProfiles/startupProfile/${startupProfileId}/documentations${buildOptions}`,
    )
  }

  static createOneByStartupProfileId(
    startupProfileId: string,
    values: Partial<Documentation>,
  ): Promise<Documentation> {
    return HttpService.api.post(
      `/v1/startupProfiles/startupProfile/${startupProfileId}/documentations`,
      values,
    )
  }
}
