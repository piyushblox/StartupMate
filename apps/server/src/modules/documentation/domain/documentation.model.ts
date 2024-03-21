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

@Entity()
export class Documentation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  description?: string

  @Column({ nullable: true })
  founderName?: string

  @Column({ nullable: true })
  founderEmail?: string

  @Column({ nullable: true })
  founderLinkedin?: string

  @Column({ unique: true })
  startupProfileId: string

  @ManyToOne(() => StartupProfile, parent => parent.documentations)
  @JoinColumn({ name: 'startupProfileId' })
  startupProfile?: StartupProfile

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
