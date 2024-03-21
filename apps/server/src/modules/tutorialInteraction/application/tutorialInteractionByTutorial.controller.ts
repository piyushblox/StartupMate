import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TutorialInteractionDomainFacade } from '@server/modules/tutorialInteraction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TutorialInteractionApplicationEvent } from './tutorialInteraction.application.event'
import { TutorialInteractionCreateDto } from './tutorialInteraction.dto'

import { TutorialDomainFacade } from '../../tutorial/domain'

@Controller('/v1/tutorials')
export class TutorialInteractionByTutorialController {
  constructor(
    private tutorialDomainFacade: TutorialDomainFacade,

    private tutorialInteractionDomainFacade: TutorialInteractionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tutorial/:tutorialId/tutorialInteractions')
  async findManyTutorialId(
    @Param('tutorialId') tutorialId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.tutorialDomainFacade.findOneByIdOrFail(tutorialId)

    const items = await this.tutorialInteractionDomainFacade.findManyByTutorial(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tutorial/:tutorialId/tutorialInteractions')
  async createByTutorialId(
    @Param('tutorialId') tutorialId: string,
    @Body() body: TutorialInteractionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tutorialId }

    const item =
      await this.tutorialInteractionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TutorialInteractionApplicationEvent.TutorialInteractionCreated.Payload>(
      TutorialInteractionApplicationEvent.TutorialInteractionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
