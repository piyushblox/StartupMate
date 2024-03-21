export namespace DocumentationApplicationEvent {
  export namespace DocumentationCreated {
    export const key = 'documentation.application.documentation.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
