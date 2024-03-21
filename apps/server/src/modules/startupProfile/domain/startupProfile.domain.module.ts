import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { StartupProfileDomainFacade } from './startupProfile.domain.facade'
import { StartupProfile } from './startupProfile.model'

@Module({
  imports: [TypeOrmModule.forFeature([StartupProfile]), DatabaseHelperModule],
  providers: [StartupProfileDomainFacade, StartupProfileDomainFacade],
  exports: [StartupProfileDomainFacade],
})
export class StartupProfileDomainModule {}
