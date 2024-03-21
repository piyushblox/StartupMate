import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { StartupProfileDomainModule } from '../domain'
import { StartupProfileController } from './startupProfile.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { StartupProfileByUserController } from './startupProfileByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    StartupProfileDomainModule,

    UserDomainModule,
  ],
  controllers: [StartupProfileController, StartupProfileByUserController],
  providers: [],
})
export class StartupProfileApplicationModule {}
