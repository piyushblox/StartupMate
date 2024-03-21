import { TestQuestion } from '../testQuestion'

export class TestAnswer {
  id: string

  answerText?: string

  isCorrect?: boolean

  questionId: string

  question?: TestQuestion

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
