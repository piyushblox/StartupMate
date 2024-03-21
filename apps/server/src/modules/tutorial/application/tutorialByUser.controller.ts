import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TutorialDomainFacade } from '@server/modules/tutorial/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TutorialApplicationEvent } from './tutorial.application.event'
import { TutorialCreateDto } from './tutorial.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TutorialByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private tutorialDomainFacade: TutorialDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/tutorials')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.tutorialDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/tutorials')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: TutorialCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.tutorialDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TutorialApplicationEvent.TutorialCreated.Payload>(
      TutorialApplicationEvent.TutorialCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
