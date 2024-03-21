import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TutorialDomainModule } from '../domain'
import { TutorialController } from './tutorial.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TutorialByUserController } from './tutorialByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, TutorialDomainModule, UserDomainModule],
  controllers: [TutorialController, TutorialByUserController],
  providers: [],
})
export class TutorialApplicationModule {}
