import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TestAnswerDomainModule } from '../domain'
import { TestAnswerController } from './testAnswer.controller'

import { TestQuestionDomainModule } from '../../../modules/testQuestion/domain'

import { TestAnswerByTestQuestionController } from './testAnswerByTestQuestion.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TestAnswerDomainModule,

    TestQuestionDomainModule,
  ],
  controllers: [TestAnswerController, TestAnswerByTestQuestionController],
  providers: [],
})
export class TestAnswerApplicationModule {}
