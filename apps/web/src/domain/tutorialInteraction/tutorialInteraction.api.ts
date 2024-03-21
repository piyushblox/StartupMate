import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { TutorialInteraction } from './tutorialInteraction.model'

export class TutorialInteractionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<TutorialInteraction>,
  ): Promise<TutorialInteraction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tutorialInteractions${buildOptions}`)
  }

  static findOne(
    tutorialInteractionId: string,
    queryOptions?: ApiHelper.QueryOptions<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tutorialInteractions/${tutorialInteractionId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    return HttpService.api.post(`/v1/tutorialInteractions`, values)
  }

  static updateOne(
    tutorialInteractionId: string,
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    return HttpService.api.patch(
      `/v1/tutorialInteractions/${tutorialInteractionId}`,
      values,
    )
  }

  static deleteOne(tutorialInteractionId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/tutorialInteractions/${tutorialInteractionId}`,
    )
  }

  static findManyByTutorialId(
    tutorialId: string,
    queryOptions?: ApiHelper.QueryOptions<TutorialInteraction>,
  ): Promise<TutorialInteraction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tutorials/tutorial/${tutorialId}/tutorialInteractions${buildOptions}`,
    )
  }

  static createOneByTutorialId(
    tutorialId: string,
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    return HttpService.api.post(
      `/v1/tutorials/tutorial/${tutorialId}/tutorialInteractions`,
      values,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<TutorialInteraction>,
  ): Promise<TutorialInteraction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/tutorialInteractions${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<TutorialInteraction>,
  ): Promise<TutorialInteraction> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/tutorialInteractions`,
      values,
    )
  }
}
