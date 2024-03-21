export namespace StartupProfileApplicationEvent {
  export namespace StartupProfileCreated {
    export const key = 'startupProfile.application.startupProfile.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
