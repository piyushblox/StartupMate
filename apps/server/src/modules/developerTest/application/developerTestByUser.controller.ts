import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DeveloperTestDomainFacade } from '@server/modules/developerTest/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DeveloperTestApplicationEvent } from './developerTest.application.event'
import { DeveloperTestCreateDto } from './developerTest.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class DeveloperTestByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private developerTestDomainFacade: DeveloperTestDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/developerTests')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.developerTestDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/developerTests')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: DeveloperTestCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
