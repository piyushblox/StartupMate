import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { StartupProfileDomainFacade } from '@server/modules/startupProfile/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { StartupProfileApplicationEvent } from './startupProfile.application.event'
import { StartupProfileCreateDto } from './startupProfile.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class StartupProfileByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private startupProfileDomainFacade: StartupProfileDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/startupProfiles')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.startupProfileDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/startupProfiles')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: StartupProfileCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.startupProfileDomainFacade.create(valuesUpdated)

    await this.eventService.emit<StartupProfileApplicationEvent.StartupProfileCreated.Payload>(
      StartupProfileApplicationEvent.StartupProfileCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
