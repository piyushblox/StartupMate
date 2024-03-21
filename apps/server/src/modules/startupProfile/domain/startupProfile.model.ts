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

import { Documentation } from '../../../modules/documentation/domain'

import { DeveloperRequirement } from '../../../modules/developerRequirement/domain'

@Entity()
export class StartupProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name?: string

  @Column({ nullable: true })
  website?: string

  @Column({ nullable: true })
  linkedin?: string

  @Column({ unique: true })
  userId: string

  @ManyToOne(() => User, parent => parent.startupProfiles)
  @JoinColumn({ name: 'userId' })
  user?: User

  @OneToMany(() => Documentation, child => child.startupProfile)
  documentations?: Documentation[]

  @OneToMany(() => DeveloperRequirement, child => child.startupProfile)
  developerRequirements?: DeveloperRequirement[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
