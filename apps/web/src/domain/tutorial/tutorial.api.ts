import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tutorial } from './tutorial.model'

export class TutorialApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Tutorial>,
  ): Promise<Tutorial[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tutorials${buildOptions}`)
  }

  static findOne(
    tutorialId: string,
    queryOptions?: ApiHelper.QueryOptions<Tutorial>,
  ): Promise<Tutorial> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tutorials/${tutorialId}${buildOptions}`)
  }

  static createOne(values: Partial<Tutorial>): Promise<Tutorial> {
    return HttpService.api.post(`/v1/tutorials`, values)
  }

  static updateOne(
    tutorialId: string,
    values: Partial<Tutorial>,
  ): Promise<Tutorial> {
    return HttpService.api.patch(`/v1/tutorials/${tutorialId}`, values)
  }

  static deleteOne(tutorialId: string): Promise<void> {
    return HttpService.api.delete(`/v1/tutorials/${tutorialId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Tutorial>,
  ): Promise<Tutorial[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/tutorials${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Tutorial>,
  ): Promise<Tutorial> {
    return HttpService.api.post(`/v1/users/user/${userId}/tutorials`, values)
  }
}
