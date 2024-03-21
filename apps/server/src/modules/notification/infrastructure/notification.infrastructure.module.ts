import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationStartupProfileSubscriber } from './subscribers/notification.startupProfile.subscriber'

import { NotificationDocumentationSubscriber } from './subscribers/notification.documentation.subscriber'

import { NotificationDeveloperRequirementSubscriber } from './subscribers/notification.developerRequirement.subscriber'

import { NotificationTestQuestionSubscriber } from './subscribers/notification.testQuestion.subscriber'

import { NotificationTestAnswerSubscriber } from './subscribers/notification.testAnswer.subscriber'

import { NotificationDeveloperTestSubscriber } from './subscribers/notification.developerTest.subscriber'

import { NotificationTutorialSubscriber } from './subscribers/notification.tutorial.subscriber'

import { NotificationTutorialInteractionSubscriber } from './subscribers/notification.tutorialInteraction.subscriber'

import { NotificationCommunityMessageSubscriber } from './subscribers/notification.communityMessage.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationStartupProfileSubscriber,

    NotificationDocumentationSubscriber,

    NotificationDeveloperRequirementSubscriber,

    NotificationTestQuestionSubscriber,

    NotificationTestAnswerSubscriber,

    NotificationDeveloperTestSubscriber,

    NotificationTutorialSubscriber,

    NotificationTutorialInteractionSubscriber,

    NotificationCommunityMessageSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
