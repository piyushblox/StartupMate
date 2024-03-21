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

import { DeveloperRequirement } from '../../../modules/developerRequirement/domain'

import { TestAnswer } from '../../../modules/testAnswer/domain'

@Entity()
export class TestQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  questionText?: string

  @Column({})
  developerRequirementId: string

  @ManyToOne(() => DeveloperRequirement, parent => parent.testQuestions)
  @JoinColumn({ name: 'developerRequirementId' })
  developerRequirement?: DeveloperRequirement

  @OneToMany(() => TestAnswer, child => child.question)
  testAnswersAsQuestion?: TestAnswer[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
