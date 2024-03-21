import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { DocumentationDomainFacade } from '@server/modules/documentation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { DocumentationApplicationEvent } from './documentation.application.event'
import { DocumentationCreateDto } from './documentation.dto'

import { StartupProfileDomainFacade } from '../../startupProfile/domain'

@Controller('/v1/startupProfiles')
export class DocumentationByStartupProfileController {
  constructor(
    private startupProfileDomainFacade: StartupProfileDomainFacade,

    private documentationDomainFacade: DocumentationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/startupProfile/:startupProfileId/documentations')
  async findManyStartupProfileId(
    @Param('startupProfileId') startupProfileId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.startupProfileDomainFacade.findOneByIdOrFail(startupProfileId)

    const items = await this.documentationDomainFacade.findManyByStartupProfile(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/startupProfile/:startupProfileId/documentations')
  async createByStartupProfileId(
    @Param('startupProfileId') startupProfileId: string,
    @Body() body: DocumentationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, startupProfileId }

    const item = await this.documentationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<DocumentationApplicationEvent.DocumentationCreated.Payload>(
      DocumentationApplicationEvent.DocumentationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
