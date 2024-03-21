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

import { Tutorial } from '../../../modules/tutorial/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class TutorialInteraction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  type?: string

  @Column({ nullable: true })
  content?: string

  @Column({})
  tutorialId: string

  @ManyToOne(() => Tutorial, parent => parent.tutorialInteractions)
  @JoinColumn({ name: 'tutorialId' })
  tutorial?: Tutorial

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.tutorialInteractions)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
