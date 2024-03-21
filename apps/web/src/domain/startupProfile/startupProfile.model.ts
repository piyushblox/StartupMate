import { User } from '../user'

import { Documentation } from '../documentation'

import { DeveloperRequirement } from '../developerRequirement'

export class StartupProfile {
  id: string

  name?: string

  website?: string

  linkedin?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  documentations?: Documentation[]

  developerRequirements?: DeveloperRequirement[]
}
