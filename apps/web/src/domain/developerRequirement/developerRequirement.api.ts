import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { DeveloperRequirement } from './developerRequirement.model'

export class DeveloperRequirementApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<DeveloperRequirement>,
  ): Promise<DeveloperRequirement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/developerRequirements${buildOptions}`)
  }

  static findOne(
    developerRequirementId: string,
    queryOptions?: ApiHelper.QueryOptions<DeveloperRequirement>,
  ): Promise<DeveloperRequirement> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/developerRequirements/${developerRequirementId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<DeveloperRequirement>,
  ): Promise<DeveloperRequirement> {
    return HttpService.api.post(`/v1/developerRequirements`, values)
  }

  static updateOne(
    developerRequirementId: string,
    values: Partial<DeveloperRequirement>,
  ): Promise<DeveloperRequirement> {
    return HttpService.api.patch(
      `/v1/developerRequirements/${developerRequirementId}`,
      values,
    )
  }

  static deleteOne(developerRequirementId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/developerRequirements/${developerRequirementId}`,
    )
  }

  static findManyByStartupProfileId(
    startupProfileId: string,
    queryOptions?: ApiHelper.QueryOptions<DeveloperRequirement>,
  ): Promise<DeveloperRequirement[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/startupProfiles/startupProfile/${startupProfileId}/developerRequirements${buildOptions}`,
    )
  }

  static createOneByStartupProfileId(
    startupProfileId: string,
    values: Partial<DeveloperRequirement>,
  ): Promise<DeveloperRequirement> {
    return HttpService.api.post(
      `/v1/startupProfiles/startupProfile/${startupProfileId}/developerRequirements`,
      values,
    )
  }
}
