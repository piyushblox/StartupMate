import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CommunityMessageDomainFacade } from '@server/modules/communityMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CommunityMessageApplicationEvent } from './communityMessage.application.event'
import { CommunityMessageCreateDto } from './communityMessage.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class CommunityMessageByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private communityMessageDomainFacade: CommunityMessageDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/communityMessages')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.communityMessageDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/communityMessages')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: CommunityMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.communityMessageDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CommunityMessageApplicationEvent.CommunityMessageCreated.Payload>(
      CommunityMessageApplicationEvent.CommunityMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
