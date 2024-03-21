import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DeveloperRequirementDomainModule } from '../domain'
import { DeveloperRequirementController } from './developerRequirement.controller'

import { StartupProfileDomainModule } from '../../../modules/startupProfile/domain'

import { DeveloperRequirementByStartupProfileController } from './developerRequirementByStartupProfile.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DeveloperRequirementDomainModule,

    StartupProfileDomainModule,
  ],
  controllers: [
    DeveloperRequirementController,

    DeveloperRequirementByStartupProfileController,
  ],
  providers: [],
})
export class DeveloperRequirementApplicationModule {}
