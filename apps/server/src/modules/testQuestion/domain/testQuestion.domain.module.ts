import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TestQuestionDomainFacade } from './testQuestion.domain.facade'
import { TestQuestion } from './testQuestion.model'

@Module({
  imports: [TypeOrmModule.forFeature([TestQuestion]), DatabaseHelperModule],
  providers: [TestQuestionDomainFacade, TestQuestionDomainFacade],
  exports: [TestQuestionDomainFacade],
})
export class TestQuestionDomainModule {}
