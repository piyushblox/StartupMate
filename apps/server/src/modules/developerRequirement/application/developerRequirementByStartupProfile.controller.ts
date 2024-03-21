import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeveloperRequirementDomainFacade } from '@server/modules/developerRequirement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeveloperRequirementApplicationEvent } from './developerRequirement.application.event'
import { DeveloperRequirementCreateDto } from './developerRequirement.dto'

import { StartupProfileDomainFacade } from '../../startupProfile/domain'

@Controller('/v1/startupProfiles')
export class DeveloperRequirementByStartupProfileController {
  constructor(
    private startupProfileDomainFacade: StartupProfileDomainFacade,

    private developerRequirementDomainFacade: DeveloperRequirementDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/startupProfile/:startupProfileId/developerRequirements')
  async findManyStartupProfileId(
    @Param('startupProfileId') startupProfileId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.startupProfileDomainFacade.findOneByIdOrFail(startupProfileId)

    const items =
      await this.developerRequirementDomainFacade.findManyByStartupProfile(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/startupProfile/:startupProfileId/developerRequirements')
  async createByStartupProfileId(
    @Param('startupProfileId') startupProfileId: string,
    @Body() body: DeveloperRequirementCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, startupProfileId }

    const item =
      await this.developerRequirementDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DeveloperRequirementApplicationEvent.DeveloperRequirementCreated.Payload>(
      DeveloperRequirementApplicationEvent.DeveloperRequirementCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
