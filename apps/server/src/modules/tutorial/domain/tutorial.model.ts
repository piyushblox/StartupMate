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

import { User } from '../../../modules/user/domain'

import { TutorialInteraction } from '../../../modules/tutorialInteraction/domain'

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  title?: string

  @Column({ nullable: true })
  content?: string

  @Column({ nullable: true })
  isVerified?: boolean

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.tutorials)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => TutorialInteraction, child => child.tutorial)
  tutorialInteractions?: TutorialInteraction[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
