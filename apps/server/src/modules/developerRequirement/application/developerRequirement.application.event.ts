export namespace DeveloperRequirementApplicationEvent {
  export namespace DeveloperRequirementCreated {
    export const key =
      'developerRequirement.application.developerRequirement.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
