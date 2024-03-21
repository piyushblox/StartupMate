import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CommunityMessageDomainModule } from '../domain'
import { CommunityMessageController } from './communityMessage.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { CommunityMessageByUserController } from './communityMessageByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CommunityMessageDomainModule,

    UserDomainModule,
  ],
  controllers: [CommunityMessageController, CommunityMessageByUserController],
  providers: [],
})
export class CommunityMessageApplicationModule {}
