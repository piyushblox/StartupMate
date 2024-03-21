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
  DeveloperTest,
  DeveloperTestDomainFacade,
} from '@server/modules/developerTest/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DeveloperTestApplicationEvent } from './developerTest.application.event'
import {
  DeveloperTestCreateDto,
  DeveloperTestUpdateDto,
} from './developerTest.dto'

@Controller('/v1/developerTests')
export class DeveloperTestController {
  constructor(
    private eventService: EventService,
    private developerTestDomainFacade: DeveloperTestDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.developerTestDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DeveloperTestCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.developerTestDomainFacade.create(body)

    await this.eventService.emit<DeveloperTestApplicationEvent.DeveloperTestCreated.Payload>(
      DeveloperTestApplicationEvent.DeveloperTestCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:developerTestId')
  async findOne(
    @Param('developerTestId') developerTestId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.developerTestDomainFacade.findOneByIdOrFail(
      developerTestId,
      queryOptions,
    )

    return item
  }

  @Patch('/:developerTestId')
  async update(
    @Param('developerTestId') developerTestId: string,
    @Body() body: DeveloperTestUpdateDto,
  ) {
    const item =
      await this.developerTestDomainFacade.findOneByIdOrFail(developerTestId)

    const itemUpdated = await this.developerTestDomainFacade.update(
      item,
      body as Partial<DeveloperTest>,
    )
    return itemUpdated
  }

  @Delete('/:developerTestId')
  async delete(@Param('developerTestId') developerTestId: string) {
    const item =
      await this.developerTestDomainFacade.findOneByIdOrFail(developerTestId)

    await this.developerTestDomainFacade.delete(item)

    return item
  }
}
