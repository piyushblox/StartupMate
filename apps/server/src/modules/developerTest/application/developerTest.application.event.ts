export namespace DeveloperTestApplicationEvent {
  export namespace DeveloperTestCreated {
    export const key = 'developerTest.application.developerTest.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
