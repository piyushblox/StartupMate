import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { TestAnswer } from './testAnswer.model'

export class TestAnswerApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<TestAnswer>,
  ): Promise<TestAnswer[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/testAnswers${buildOptions}`)
  }

  static findOne(
    testAnswerId: string,
    queryOptions?: ApiHelper.QueryOptions<TestAnswer>,
  ): Promise<TestAnswer> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/testAnswers/${testAnswerId}${buildOptions}`)
  }

  static createOne(values: Partial<TestAnswer>): Promise<TestAnswer> {
    return HttpService.api.post(`/v1/testAnswers`, values)
  }

  static updateOne(
    testAnswerId: string,
    values: Partial<TestAnswer>,
  ): Promise<TestAnswer> {
    return HttpService.api.patch(`/v1/testAnswers/${testAnswerId}`, values)
  }

  static deleteOne(testAnswerId: string): Promise<void> {
    return HttpService.api.delete(`/v1/testAnswers/${testAnswerId}`)
  }

  static findManyByQuestionId(
    questionId: string,
    queryOptions?: ApiHelper.QueryOptions<TestAnswer>,
  ): Promise<TestAnswer[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/testQuestions/question/${questionId}/testAnswers${buildOptions}`,
    )
  }

  static createOneByQuestionId(
    questionId: string,
    values: Partial<TestAnswer>,
  ): Promise<TestAnswer> {
    return HttpService.api.post(
      `/v1/testQuestions/question/${questionId}/testAnswers`,
      values,
    )
  }
}
