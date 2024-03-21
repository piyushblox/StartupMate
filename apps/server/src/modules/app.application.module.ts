import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { StartupProfileApplicationModule } from './startupProfile/application'

import { DocumentationApplicationModule } from './documentation/application'

import { DeveloperRequirementApplicationModule } from './developerRequirement/application'

import { TestQuestionApplicationModule } from './testQuestion/application'

import { TestAnswerApplicationModule } from './testAnswer/application'

import { DeveloperTestApplicationModule } from './developerTest/application'

import { TutorialApplicationModule } from './tutorial/application'

import { TutorialInteractionApplicationModule } from './tutorialInteraction/application'

import { CommunityMessageApplicationModule } from './communityMessage/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    StartupProfileApplicationModule,

    DocumentationApplicationModule,

    DeveloperRequirementApplicationModule,

    TestQuestionApplicationModule,

    TestAnswerApplicationModule,

    DeveloperTestApplicationModule,

    TutorialApplicationModule,

    TutorialInteractionApplicationModule,

    CommunityMessageApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
