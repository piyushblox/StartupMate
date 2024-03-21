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

import { TestQuestion } from '../../../modules/testQuestion/domain'

@Entity()
export class TestAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  answerText?: string

  @Column({ nullable: true })
  isCorrect?: boolean

  @Column({})
  questionId: string

  @ManyToOne(() => TestQuestion, parent => parent.testAnswersAsQuestion)
  @JoinColumn({ name: 'questionId' })
  question?: TestQuestion

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
