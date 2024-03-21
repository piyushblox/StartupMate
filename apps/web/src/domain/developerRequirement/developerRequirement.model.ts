import { StartupProfile } from '../startupProfile'

import { TestQuestion } from '../testQuestion'

import { DeveloperTest } from '../developerTest'

export class DeveloperRequirement {
  id: string

  requirementText?: string

  startupProfileId: string

  startupProfile?: StartupProfile

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  testQuestions?: TestQuestion[]

  developerTests?: DeveloperTest[]
}
