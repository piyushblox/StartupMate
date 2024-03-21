import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DeveloperRequirementDomainFacade } from './developerRequirement.domain.facade'
import { DeveloperRequirement } from './developerRequirement.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([DeveloperRequirement]),
    DatabaseHelperModule,
  ],
  providers: [
    DeveloperRequirementDomainFacade,
    DeveloperRequirementDomainFacade,
  ],
  exports: [DeveloperRequirementDomainFacade],
})
export class DeveloperRequirementDomainModule {}
