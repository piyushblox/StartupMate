export namespace TutorialInteractionApplicationEvent {
  export namespace TutorialInteractionCreated {
    export const key =
      'tutorialInteraction.application.tutorialInteraction.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
