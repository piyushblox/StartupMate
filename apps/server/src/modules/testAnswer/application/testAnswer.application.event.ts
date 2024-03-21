export namespace TestAnswerApplicationEvent {
  export namespace TestAnswerCreated {
    export const key = 'testAnswer.application.testAnswer.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
