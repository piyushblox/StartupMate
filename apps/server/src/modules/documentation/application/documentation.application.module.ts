import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DocumentationDomainModule } from '../domain'
import { DocumentationController } from './documentation.controller'

import { StartupProfileDomainModule } from '../../../modules/startupProfile/domain'

import { DocumentationByStartupProfileController } from './documentationByStartupProfile.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DocumentationDomainModule,

    StartupProfileDomainModule,
  ],
  controllers: [
    DocumentationController,

    DocumentationByStartupProfileController,
  ],
  providers: [],
})
export class DocumentationApplicationModule {}
