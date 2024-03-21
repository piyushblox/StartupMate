import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { StartupProfileDomainModule } from './startupProfile/domain'

import { DocumentationDomainModule } from './documentation/domain'

import { DeveloperRequirementDomainModule } from './developerRequirement/domain'

import { TestQuestionDomainModule } from './testQuestion/domain'

import { TestAnswerDomainModule } from './testAnswer/domain'

import { DeveloperTestDomainModule } from './developerTest/domain'

import { TutorialDomainModule } from './tutorial/domain'

import { TutorialInteractionDomainModule } from './tutorialInteraction/domain'

import { CommunityMessageDomainModule } from './communityMessage/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    StartupProfileDomainModule,

    DocumentationDomainModule,

    DeveloperRequirementDomainModule,

    TestQuestionDomainModule,

    TestAnswerDomainModule,

    DeveloperTestDomainModule,

    TutorialDomainModule,

    TutorialInteractionDomainModule,

    CommunityMessageDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
