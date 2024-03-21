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
  TestQuestion,
  TestQuestionDomainFacade,
} from '@server/modules/testQuestion/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TestQuestionApplicationEvent } from './testQuestion.application.event'
import {
  TestQuestionCreateDto,
  TestQuestionUpdateDto,
} from './testQuestion.dto'

@Controller('/v1/testQuestions')
export class TestQuestionController {
  constructor(
    private eventService: EventService,
    private testQuestionDomainFacade: TestQuestionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.testQuestionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TestQuestionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.testQuestionDomainFacade.create(body)

    await this.eventService.emit<TestQuestionApplicationEvent.TestQuestionCreated.Payload>(
      TestQuestionApplicationEvent.TestQuestionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:testQuestionId')
  async findOne(
    @Param('testQuestionId') testQuestionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.testQuestionDomainFacade.findOneByIdOrFail(
      testQuestionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:testQuestionId')
  async update(
    @Param('testQuestionId') testQuestionId: string,
    @Body() body: TestQuestionUpdateDto,
  ) {
    const item =
      await this.testQuestionDomainFacade.findOneByIdOrFail(testQuestionId)

    const itemUpdated = await this.testQuestionDomainFacade.update(
      item,
      body as Partial<TestQuestion>,
    )
    return itemUpdated
  }

  @Delete('/:testQuestionId')
  async delete(@Param('testQuestionId') testQuestionId: string) {
    const item =
      await this.testQuestionDomainFacade.findOneByIdOrFail(testQuestionId)

    await this.testQuestionDomainFacade.delete(item)

    return item
  }
}
