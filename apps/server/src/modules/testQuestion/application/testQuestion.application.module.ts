import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TestQuestionDomainModule } from '../domain'
import { TestQuestionController } from './testQuestion.controller'

import { DeveloperRequirementDomainModule } from '../../../modules/developerRequirement/domain'

import { TestQuestionByDeveloperRequirementController } from './testQuestionByDeveloperRequirement.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TestQuestionDomainModule,

    DeveloperRequirementDomainModule,
  ],
  controllers: [
    TestQuestionController,

    TestQuestionByDeveloperRequirementController,
  ],
  providers: [],
})
export class TestQuestionApplicationModule {}
