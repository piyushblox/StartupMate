import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Notification } from '../../../modules/notification/domain'

import { StartupProfile } from '../../../modules/startupProfile/domain'

import { DeveloperTest } from '../../../modules/developerTest/domain'

import { Tutorial } from '../../../modules/tutorial/domain'

import { TutorialInteraction } from '../../../modules/tutorialInteraction/domain'

import { CommunityMessage } from '../../../modules/communityMessage/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => StartupProfile, child => child.user)
  startupProfiles?: StartupProfile[]

  @OneToMany(() => DeveloperTest, child => child.user)
  developerTests?: DeveloperTest[]

  @OneToMany(() => Tutorial, child => child.user)
  tutorials?: Tutorial[]

  @OneToMany(() => TutorialInteraction, child => child.user)
  tutorialInteractions?: TutorialInteraction[]

  @OneToMany(() => CommunityMessage, child => child.user)
  communityMessages?: CommunityMessage[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
