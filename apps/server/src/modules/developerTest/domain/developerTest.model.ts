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

import { DeveloperRequirement } from '../../../modules/developerRequirement/domain'

@Entity()
export class DeveloperTest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  passed?: boolean

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.developerTests)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  developerRequirementId: string

  @ManyToOne(() => DeveloperRequirement, parent => parent.developerTests)
  @JoinColumn({ name: 'developerRequirementId' })
  developerRequirement?: DeveloperRequirement

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
