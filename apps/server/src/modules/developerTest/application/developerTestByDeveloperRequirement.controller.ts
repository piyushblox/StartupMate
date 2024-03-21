import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeveloperTestDomainFacade } from '@server/modules/developerTest/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeveloperTestApplicationEvent } from './developerTest.application.event'
import { DeveloperTestCreateDto } from './developerTest.dto'

import { DeveloperRequirementDomainFacade } from '../../developerRequirement/domain'

@Controller('/v1/developerRequirements')
export class DeveloperTestByDeveloperRequirementController {
  constructor(
    private developerRequirementDomainFacade: DeveloperRequirementDomainFacade,

    private developerTestDomainFacade: DeveloperTestDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/developerRequirement/:developerRequirementId/developerTests')
  async findManyDeveloperRequirementId(
    @Param('developerRequirementId') developerRequirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.developerRequirementDomainFacade.findOneByIdOrFail(
        developerRequirementId,
      )

    const items =
      await this.developerTestDomainFacade.findManyByDeveloperRequirement(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/developerRequirement/:developerRequirementId/developerTests')
  async createByDeveloperRequirementId(
    @Param('developerRequirementId') developerRequirementId: string,
    @Body() body: DeveloperTestCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, developerRequirementId }

    const item = await this.developerTestDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DeveloperTestApplicationEvent.DeveloperTestCreated.Payload>(
      DeveloperTestApplicationEvent.DeveloperTestCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
