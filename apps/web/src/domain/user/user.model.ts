import { Notification } from '../notification'

import { StartupProfile } from '../startupProfile'

import { DeveloperTest } from '../developerTest'

import { Tutorial } from '../tutorial'

import { TutorialInteraction } from '../tutorialInteraction'

import { CommunityMessage } from '../communityMessage'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  startupProfiles?: StartupProfile[]

  developerTests?: DeveloperTest[]

  tutorials?: Tutorial[]

  tutorialInteractions?: TutorialInteraction[]

  communityMessages?: CommunityMessage[]
}
