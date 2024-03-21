import { User } from '../user'

import { TutorialInteraction } from '../tutorialInteraction'

export class Tutorial {
  id: string

  title?: string

  content?: string

  isVerified?: boolean

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  tutorialInteractions?: TutorialInteraction[]
}
