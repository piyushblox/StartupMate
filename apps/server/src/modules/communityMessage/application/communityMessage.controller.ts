import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  CommunityMessage,
  CommunityMessageDomainFacade,
} from '@server/modules/communityMessage/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CommunityMessageApplicationEvent } from './communityMessage.application.event'
import {
  CommunityMessageCreateDto,
  CommunityMessageUpdateDto,
} from './communityMessage.dto'

@Controller('/v1/communityMessages')
export class CommunityMessageController {
  constructor(
    private eventService: EventService,
    private communityMessageDomainFacade: CommunityMessageDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.communityMessageDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: CommunityMessageCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.communityMessageDomainFacade.create(body)

    await this.eventService.emit<CommunityMessageApplicationEvent.CommunityMessageCreated.Payload>(
      CommunityMessageApplicationEvent.CommunityMessageCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:communityMessageId')
  async findOne(
    @Param('communityMessageId') communityMessageId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.communityMessageDomainFacade.findOneByIdOrFail(
      communityMessageId,
      queryOptions,
    )

    return item
  }

  @Patch('/:communityMessageId')
  async update(
    @Param('communityMessageId') communityMessageId: string,
    @Body() body: CommunityMessageUpdateDto,
  ) {
    const item =
      await this.communityMessageDomainFacade.findOneByIdOrFail(
        communityMessageId,
      )

    const itemUpdated = await this.communityMessageDomainFacade.update(
      item,
      body as Partial<CommunityMessage>,
    )
    return itemUpdated
  }

  @Delete('/:communityMessageId')
  async delete(@Param('communityMessageId') communityMessageId: string) {
    const item =
      await this.communityMessageDomainFacade.findOneByIdOrFail(
        communityMessageId,
      )

    await this.communityMessageDomainFacade.delete(item)

    return item
  }
}
