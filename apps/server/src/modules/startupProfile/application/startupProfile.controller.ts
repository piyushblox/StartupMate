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
  StartupProfile,
  StartupProfileDomainFacade,
} from '@server/modules/startupProfile/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StartupProfileApplicationEvent } from './startupProfile.application.event'
import {
  StartupProfileCreateDto,
  StartupProfileUpdateDto,
} from './startupProfile.dto'

@Controller('/v1/startupProfiles')
export class StartupProfileController {
  constructor(
    private eventService: EventService,
    private startupProfileDomainFacade: StartupProfileDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.startupProfileDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StartupProfileCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.startupProfileDomainFacade.create(body)

    await this.eventService.emit<StartupProfileApplicationEvent.StartupProfileCreated.Payload>(
      StartupProfileApplicationEvent.StartupProfileCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:startupProfileId')
  async findOne(
    @Param('startupProfileId') startupProfileId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.startupProfileDomainFacade.findOneByIdOrFail(
      startupProfileId,
      queryOptions,
    )

    return item
  }

  @Patch('/:startupProfileId')
  async update(
    @Param('startupProfileId') startupProfileId: string,
    @Body() body: StartupProfileUpdateDto,
  ) {
    const item =
      await this.startupProfileDomainFacade.findOneByIdOrFail(startupProfileId)

    const itemUpdated = await this.startupProfileDomainFacade.update(
      item,
      body as Partial<StartupProfile>,
    )
    return itemUpdated
  }

  @Delete('/:startupProfileId')
  async delete(@Param('startupProfileId') startupProfileId: string) {
    const item =
      await this.startupProfileDomainFacade.findOneByIdOrFail(startupProfileId)

    await this.startupProfileDomainFacade.delete(item)

    return item
  }
}
