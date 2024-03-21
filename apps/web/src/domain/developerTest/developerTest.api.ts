import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DeveloperTest } from './developerTest.model'

export class DeveloperTestApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DeveloperTest>,
  ): Promise<DeveloperTest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/developerTests${buildOptions}`)
  }

  static findOne(
    developerTestId: string,
    queryOptions?: ApiHelper.QueryOptions<DeveloperTest>,
  ): Promise<DeveloperTest> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/developerTests/${developerTestId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<DeveloperTest>): Promise<DeveloperTest> {
    return HttpService.api.post(`/v1/developerTests`, values)
  }

  static updateOne(
    developerTestId: string,
    values: Partial<DeveloperTest>,
  ): Promise<DeveloperTest> {
    return HttpService.api.patch(
      `/v1/developerTests/${developerTestId}`,
      values,
    )
  }

  static deleteOne(developerTestId: string): Promise<void> {
    return HttpService.api.delete(`/v1/developerTests/${developerTestId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<DeveloperTest>,
  ): Promise<DeveloperTest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/developerTests${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<DeveloperTest>,
  ): Promise<DeveloperTest> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/developerTests`,
      values,
    )
  }

  static findManyByDeveloperRequirementId(
    developerRequirementId: string,
    queryOptions?: ApiHelper.QueryOptions<DeveloperTest>,
  ): Promise<DeveloperTest[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/developerRequirements/developerRequirement/${developerRequirementId}/developerTests${buildOptions}`,
    )
  }

  static createOneByDeveloperRequirementId(
    developerRequirementId: string,
    values: Partial<DeveloperTest>,
  ): Promise<DeveloperTest> {
    return HttpService.api.post(
      `/v1/developerRequirements/developerRequirement/${developerRequirementId}/developerTests`,
      values,
    )
  }
}
