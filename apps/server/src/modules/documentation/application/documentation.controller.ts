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
  Documentation,
  DocumentationDomainFacade,
} from '@server/modules/documentation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DocumentationApplicationEvent } from './documentation.application.event'
import {
  DocumentationCreateDto,
  DocumentationUpdateDto,
} from './documentation.dto'

@Controller('/v1/documentations')
export class DocumentationController {
  constructor(
    private eventService: EventService,
    private documentationDomainFacade: DocumentationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.documentationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: DocumentationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.documentationDomainFacade.create(body)

    await this.eventService.emit<DocumentationApplicationEvent.DocumentationCreated.Payload>(
      DocumentationApplicationEvent.DocumentationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:documentationId')
  async findOne(
    @Param('documentationId') documentationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.documentationDomainFacade.findOneByIdOrFail(
      documentationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:documentationId')
  async update(
    @Param('documentationId') documentationId: string,
    @Body() body: DocumentationUpdateDto,
  ) {
    const item =
      await this.documentationDomainFacade.findOneByIdOrFail(documentationId)

    const itemUpdated = await this.documentationDomainFacade.update(
      item,
      body as Partial<Documentation>,
    )
    return itemUpdated
  }

  @Delete('/:documentationId')
  async delete(@Param('documentationId') documentationId: string) {
    const item =
      await this.documentationDomainFacade.findOneByIdOrFail(documentationId)

    await this.documentationDomainFacade.delete(item)

    return item
  }
}
