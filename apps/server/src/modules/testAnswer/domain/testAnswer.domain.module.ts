import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TestAnswerDomainFacade } from './testAnswer.domain.facade'
import { TestAnswer } from './testAnswer.model'

@Module({
  imports: [TypeOrmModule.forFeature([TestAnswer]), DatabaseHelperModule],
  providers: [TestAnswerDomainFacade, TestAnswerDomainFacade],
  exports: [TestAnswerDomainFacade],
})
export class TestAnswerDomainModule {}
