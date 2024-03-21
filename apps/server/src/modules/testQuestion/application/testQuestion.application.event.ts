export namespace TestQuestionApplicationEvent {
  export namespace TestQuestionCreated {
    export const key = 'testQuestion.application.testQuestion.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
