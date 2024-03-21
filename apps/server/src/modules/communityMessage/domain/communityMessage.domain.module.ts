import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CommunityMessageDomainFacade } from './communityMessage.domain.facade'
import { CommunityMessage } from './communityMessage.model'

@Module({
  imports: [TypeOrmModule.forFeature([CommunityMessage]), DatabaseHelperModule],
  providers: [CommunityMessageDomainFacade, CommunityMessageDomainFacade],
  exports: [CommunityMessageDomainFacade],
})
export class CommunityMessageDomainModule {}
