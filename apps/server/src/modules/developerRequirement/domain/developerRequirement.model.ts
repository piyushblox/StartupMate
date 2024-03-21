import { ColumnNumeric } from '@server/core/database'
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

import { StartupProfile } from '../../../modules/startupProfile/domain'

import { TestQuestion } from '../../../modules/testQuestion/domain'

import { DeveloperTest } from '../../../modules/developerTest/domain'

@Entity()
export class DeveloperRequirement {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  requirementText?: string

  @Column({ unique: true })
  startupProfileId: string

  @ManyToOne(() => StartupProfile, parent => parent.developerRequirements)
  @JoinColumn({ name: 'startupProfileId' })
  startupProfile?: StartupProfile

  @OneToMany(() => TestQuestion, child => child.developerRequirement)
  testQuestions?: TestQuestion[]

  @OneToMany(() => DeveloperTest, child => child.developerRequirement)
  developerTests?: DeveloperTest[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
