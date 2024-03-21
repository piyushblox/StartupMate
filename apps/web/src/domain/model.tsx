import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { StartupProfile as StartupProfileModel } from './startupProfile/startupProfile.model'

import { Documentation as DocumentationModel } from './documentation/documentation.model'

import { DeveloperRequirement as DeveloperRequirementModel } from './developerRequirement/developerRequirement.model'

import { TestQuestion as TestQuestionModel } from './testQuestion/testQuestion.model'

import { TestAnswer as TestAnswerModel } from './testAnswer/testAnswer.model'

import { DeveloperTest as DeveloperTestModel } from './developerTest/developerTest.model'

import { Tutorial as TutorialModel } from './tutorial/tutorial.model'

import { TutorialInteraction as TutorialInteractionModel } from './tutorialInteraction/tutorialInteraction.model'

import { CommunityMessage as CommunityMessageModel } from './communityMessage/communityMessage.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class StartupProfile extends StartupProfileModel {}

  export class Documentation extends DocumentationModel {}

  export class DeveloperRequirement extends DeveloperRequirementModel {}

  export class TestQuestion extends TestQuestionModel {}

  export class TestAnswer extends TestAnswerModel {}

  export class DeveloperTest extends DeveloperTestModel {}

  export class Tutorial extends TutorialModel {}

  export class TutorialInteraction extends TutorialInteractionModel {}

  export class CommunityMessage extends CommunityMessageModel {}
}
