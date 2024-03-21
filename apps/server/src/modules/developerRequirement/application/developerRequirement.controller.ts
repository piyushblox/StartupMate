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
  DeveloperRequirement,
  DeveloperRequirementDomainFacade,
} from '@server/modules/developerRequirement/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { DeveloperRequirementApplicationEvent } from './developerRequirement.application.event'
import {
  DeveloperRequirementCreateDto,
  DeveloperRequirementUpdateDto,
} from './developerRequirement.dto'

@Controller('/v1/developerRequirements')
export class DeveloperRequirementController {
  constructor(
    private eventService: EventService,
    private developerRequirementDomainFacade: DeveloperRequirementDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.developerRequirementDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: DeveloperRequirementCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.developerRequirementDomainFacade.create(body)

    await this.eventService.emit<DeveloperRequirementApplicationEvent.DeveloperRequirementCreated.Payload>(
      DeveloperRequirementApplicationEvent.DeveloperRequirementCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:developerRequirementId')
  async findOne(
    @Param('developerRequirementId') developerRequirementId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.developerRequirementDomainFacade.findOneByIdOrFail(
      developerRequirementId,
      queryOptions,
    )

    return item
  }

  @Patch('/:developerRequirementId')
  async update(
    @Param('developerRequirementId') developerRequirementId: string,
    @Body() body: DeveloperRequirementUpdateDto,
  ) {
    const item = await this.developerRequirementDomainFacade.findOneByIdOrFail(
      developerRequirementId,
    )

    const itemUpdated = await this.developerRequirementDomainFacade.update(
      item,
      body as Partial<DeveloperRequirement>,
    )
    return itemUpdated
  }

  @Delete('/:developerRequirementId')
  async delete(
    @Param('developerRequirementId') developerRequirementId: string,
  ) {
    const item = await this.developerRequirementDomainFacade.findOneByIdOrFail(
      developerRequirementId,
    )

    await this.developerRequirementDomainFacade.delete(item)

    return item
  }
}
