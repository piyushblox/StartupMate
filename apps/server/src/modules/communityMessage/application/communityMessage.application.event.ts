export namespace CommunityMessageApplicationEvent {
  export namespace CommunityMessageCreated {
    export const key = 'communityMessage.application.communityMessage.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
