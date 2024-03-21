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
  TestAnswer,
  TestAnswerDomainFacade,
} from '@server/modules/testAnswer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TestAnswerApplicationEvent } from './testAnswer.application.event'
import { TestAnswerCreateDto, TestAnswerUpdateDto } from './testAnswer.dto'

@Controller('/v1/testAnswers')
export class TestAnswerController {
  constructor(
    private eventService: EventService,
    private testAnswerDomainFacade: TestAnswerDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.testAnswerDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: TestAnswerCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.testAnswerDomainFacade.create(body)

    await this.eventService.emit<TestAnswerApplicationEvent.TestAnswerCreated.Payload>(
      TestAnswerApplicationEvent.TestAnswerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:testAnswerId')
  async findOne(
    @Param('testAnswerId') testAnswerId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.testAnswerDomainFacade.findOneByIdOrFail(
      testAnswerId,
      queryOptions,
    )

    return item
  }

  @Patch('/:testAnswerId')
  async update(
    @Param('testAnswerId') testAnswerId: string,
    @Body() body: TestAnswerUpdateDto,
  ) {
    const item =
      await this.testAnswerDomainFacade.findOneByIdOrFail(testAnswerId)

    const itemUpdated = await this.testAnswerDomainFacade.update(
      item,
      body as Partial<TestAnswer>,
    )
    return itemUpdated
  }

  @Delete('/:testAnswerId')
  async delete(@Param('testAnswerId') testAnswerId: string) {
    const item =
      await this.testAnswerDomainFacade.findOneByIdOrFail(testAnswerId)

    await this.testAnswerDomainFacade.delete(item)

    return item
  }
}
