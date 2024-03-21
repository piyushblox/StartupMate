import { Tutorial } from '../tutorial'

import { User } from '../user'

export class TutorialInteraction {
  id: string

  type?: string

  content?: string

  tutorialId: string

  tutorial?: Tutorial

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
