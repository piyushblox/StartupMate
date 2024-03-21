export namespace TutorialApplicationEvent {
  export namespace TutorialCreated {
    export const key = 'tutorial.application.tutorial.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
