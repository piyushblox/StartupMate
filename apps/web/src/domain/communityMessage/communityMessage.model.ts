import { User } from '../user'

export class CommunityMessage {
  id: string

  communityType?: string

  messageText?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
