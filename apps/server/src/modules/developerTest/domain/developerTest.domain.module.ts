import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DeveloperTestDomainFacade } from './developerTest.domain.facade'
import { DeveloperTest } from './developerTest.model'

@Module({
  imports: [TypeOrmModule.forFeature([DeveloperTest]), DatabaseHelperModule],
  providers: [DeveloperTestDomainFacade, DeveloperTestDomainFacade],
  exports: [DeveloperTestDomainFacade],
})
export class DeveloperTestDomainModule {}
