import { DeveloperRequirement } from '../developerRequirement'

import { TestAnswer } from '../testAnswer'

export class TestQuestion {
  id: string

  questionText?: string

  developerRequirementId: string

  developerRequirement?: DeveloperRequirement

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  testAnswersAsQuestion?: TestAnswer[]
}
