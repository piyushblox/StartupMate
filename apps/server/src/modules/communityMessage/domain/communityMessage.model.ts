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

@Entity()
export class CommunityMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  communityType?: string

  @Column({ nullable: true })
  messageText?: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.communityMessages)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
