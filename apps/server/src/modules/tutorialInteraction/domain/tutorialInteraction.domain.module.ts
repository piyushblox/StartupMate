import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TutorialInteractionDomainFacade } from './tutorialInteraction.domain.facade'
import { TutorialInteraction } from './tutorialInteraction.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([TutorialInteraction]),
    DatabaseHelperModule,
  ],
  providers: [TutorialInteractionDomainFacade, TutorialInteractionDomainFacade],
  exports: [TutorialInteractionDomainFacade],
})
export class TutorialInteractionDomainModule {}
