import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { DeveloperTestDomainModule } from '../domain'
import { DeveloperTestController } from './developerTest.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { DeveloperTestByUserController } from './developerTestByUser.controller'

import { DeveloperRequirementDomainModule } from '../../../modules/developerRequirement/domain'

import { DeveloperTestByDeveloperRequirementController } from './developerTestByDeveloperRequirement.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    DeveloperTestDomainModule,

    UserDomainModule,

    DeveloperRequirementDomainModule,
  ],
  controllers: [
    DeveloperTestController,

    DeveloperTestByUserController,

    DeveloperTestByDeveloperRequirementController,
  ],
  providers: [],
})
export class DeveloperTestApplicationModule {}
