import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { StartupProfileApi } from './startupProfile/startupProfile.api'

import { DocumentationApi } from './documentation/documentation.api'

import { DeveloperRequirementApi } from './developerRequirement/developerRequirement.api'

import { TestQuestionApi } from './testQuestion/testQuestion.api'

import { TestAnswerApi } from './testAnswer/testAnswer.api'

import { DeveloperTestApi } from './developerTest/developerTest.api'

import { TutorialApi } from './tutorial/tutorial.api'

import { TutorialInteractionApi } from './tutorialInteraction/tutorialInteraction.api'

import { CommunityMessageApi } from './communityMessage/communityMessage.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class StartupProfile extends StartupProfileApi {}

  export class Documentation extends DocumentationApi {}

  export class DeveloperRequirement extends DeveloperRequirementApi {}

  export class TestQuestion extends TestQuestionApi {}

  export class TestAnswer extends TestAnswerApi {}

  export class DeveloperTest extends DeveloperTestApi {}

  export class Tutorial extends TutorialApi {}

  export class TutorialInteraction extends TutorialInteractionApi {}

  export class CommunityMessage extends CommunityMessageApi {}
}
