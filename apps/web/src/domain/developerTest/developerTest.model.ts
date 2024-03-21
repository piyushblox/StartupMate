import { User } from '../user'

import { DeveloperRequirement } from '../developerRequirement'

export class DeveloperTest {
  id: string

  passed?: boolean

  userId: string

  user?: User

  developerRequirementId: string

  developerRequirement?: DeveloperRequirement

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
