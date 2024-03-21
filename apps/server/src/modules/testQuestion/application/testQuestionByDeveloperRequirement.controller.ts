import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TestQuestionDomainFacade } from '@server/modules/testQuestion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TestQuestionApplicationEvent } from './testQuestion.application.event'
import { TestQuestionCreateDto } from './testQuestion.dto'

import { DeveloperRequirementDomainFacade } from '../../developerRequirement/domain'

@Controller('/v1/developerRequirements')
export class TestQuestionByDeveloperRequirementController {
  constructor(
    private developerRequirementDomainFacade: DeveloperRequirementDomainFacade,

    private testQuestionDomainFacade: TestQuestionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/developerRequirement/:developerRequirementId/testQuestions')
  async findManyDeveloperRequirementId(
    @Param('developerRequirementId') developerRequirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.developerRequirementDomainFacade.findOneByIdOrFail(
        developerRequirementId,
      )

    const items =
      await this.testQuestionDomainFacade.findManyByDeveloperRequirement(
        parent,
        queryOptions,
      )

    return items
  }

  @Post('/developerRequirement/:developerRequirementId/testQuestions')
  async createByDeveloperRequirementId(
    @Param('developerRequirementId') developerRequirementId: string,
    @Body() body: TestQuestionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, developerRequirementId }

    const item = await this.testQuestionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TestQuestionApplicationEvent.TestQuestionCreated.Payload>(
      TestQuestionApplicationEvent.TestQuestionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
