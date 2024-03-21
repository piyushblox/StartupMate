import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TestAnswerDomainFacade } from '@server/modules/testAnswer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TestAnswerApplicationEvent } from './testAnswer.application.event'
import { TestAnswerCreateDto } from './testAnswer.dto'

import { TestQuestionDomainFacade } from '../../testQuestion/domain'

@Controller('/v1/testQuestions')
export class TestAnswerByTestQuestionController {
  constructor(
    private testQuestionDomainFacade: TestQuestionDomainFacade,

    private testAnswerDomainFacade: TestAnswerDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/question/:questionId/testAnswers')
  async findManyQuestionId(
    @Param('questionId') questionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.testQuestionDomainFacade.findOneByIdOrFail(questionId)

    const items = await this.testAnswerDomainFacade.findManyByQuestion(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/question/:questionId/testAnswers')
  async createByQuestionId(
    @Param('questionId') questionId: string,
    @Body() body: TestAnswerCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, questionId }

    const item = await this.testAnswerDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TestAnswerApplicationEvent.TestAnswerCreated.Payload>(
      TestAnswerApplicationEvent.TestAnswerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
