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
import { Tutorial, TutorialDomainFacade } from '@server/modules/tutorial/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TutorialApplicationEvent } from './tutorial.application.event'
import { TutorialCreateDto, TutorialUpdateDto } from './tutorial.dto'

@Controller('/v1/tutorials')
export class TutorialController {
  constructor(
    private eventService: EventService,
    private tutorialDomainFacade: TutorialDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.tutorialDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TutorialCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tutorialDomainFacade.create(body)

    await this.eventService.emit<TutorialApplicationEvent.TutorialCreated.Payload>(
      TutorialApplicationEvent.TutorialCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tutorialId')
  async findOne(
    @Param('tutorialId') tutorialId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tutorialDomainFacade.findOneByIdOrFail(
      tutorialId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tutorialId')
  async update(
    @Param('tutorialId') tutorialId: string,
    @Body() body: TutorialUpdateDto,
  ) {
    const item = await this.tutorialDomainFacade.findOneByIdOrFail(tutorialId)

    const itemUpdated = await this.tutorialDomainFacade.update(
      item,
      body as Partial<Tutorial>,
    )
    return itemUpdated
  }

  @Delete('/:tutorialId')
  async delete(@Param('tutorialId') tutorialId: string) {
    const item = await this.tutorialDomainFacade.findOneByIdOrFail(tutorialId)

    await this.tutorialDomainFacade.delete(item)

    return item
  }
}
