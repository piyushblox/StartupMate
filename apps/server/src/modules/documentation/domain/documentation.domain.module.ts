import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { DocumentationDomainFacade } from './documentation.domain.facade'
import { Documentation } from './documentation.model'

@Module({
  imports: [TypeOrmModule.forFeature([Documentation]), DatabaseHelperModule],
  providers: [DocumentationDomainFacade, DocumentationDomainFacade],
  exports: [DocumentationDomainFacade],
})
export class DocumentationDomainModule {}
