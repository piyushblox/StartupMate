import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TutorialInteractionDomainModule } from '../domain'
import { TutorialInteractionController } from './tutorialInteraction.controller'

import { TutorialDomainModule } from '../../../modules/tutorial/domain'

import { TutorialInteractionByTutorialController } from './tutorialInteractionByTutorial.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TutorialInteractionByUserController } from './tutorialInteractionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TutorialInteractionDomainModule,

    TutorialDomainModule,

    UserDomainModule,
  ],
  controllers: [
    TutorialInteractionController,

    TutorialInteractionByTutorialController,

    TutorialInteractionByUserController,
  ],
  providers: [],
})
export class TutorialInteractionApplicationModule {}
