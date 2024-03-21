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
  TutorialInteraction,
  TutorialInteractionDomainFacade,
} from '@server/modules/tutorialInteraction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TutorialInteractionApplicationEvent } from './tutorialInteraction.application.event'
import {
  TutorialInteractionCreateDto,
  TutorialInteractionUpdateDto,
} from './tutorialInteraction.dto'

@Controller('/v1/tutorialInteractions')
export class TutorialInteractionController {
  constructor(
    private eventService: EventService,
    private tutorialInteractionDomainFacade: TutorialInteractionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.tutorialInteractionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: TutorialInteractionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tutorialInteractionDomainFacade.create(body)

    await this.eventService.emit<TutorialInteractionApplicationEvent.TutorialInteractionCreated.Payload>(
      TutorialInteractionApplicationEvent.TutorialInteractionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tutorialInteractionId')
  async findOne(
    @Param('tutorialInteractionId') tutorialInteractionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tutorialInteractionDomainFacade.findOneByIdOrFail(
      tutorialInteractionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tutorialInteractionId')
  async update(
    @Param('tutorialInteractionId') tutorialInteractionId: string,
    @Body() body: TutorialInteractionUpdateDto,
  ) {
    const item = await this.tutorialInteractionDomainFacade.findOneByIdOrFail(
      tutorialInteractionId,
    )

    const itemUpdated = await this.tutorialInteractionDomainFacade.update(
      item,
      body as Partial<TutorialInteraction>,
    )
    return itemUpdated
  }

  @Delete('/:tutorialInteractionId')
  async delete(@Param('tutorialInteractionId') tutorialInteractionId: string) {
    const item = await this.tutorialInteractionDomainFacade.findOneByIdOrFail(
      tutorialInteractionId,
    )

    await this.tutorialInteractionDomainFacade.delete(item)

    return item
  }
}
