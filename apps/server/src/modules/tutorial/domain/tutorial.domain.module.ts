import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TutorialDomainFacade } from './tutorial.domain.facade'
import { Tutorial } from './tutorial.model'

@Module({
  imports: [TypeOrmModule.forFeature([Tutorial]), DatabaseHelperModule],
  providers: [TutorialDomainFacade, TutorialDomainFacade],
  exports: [TutorialDomainFacade],
})
export class TutorialDomainModule {}
