import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DocumentationCreateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  founderName?: string

  @IsString()
  @IsOptional()
  founderEmail?: string

  @IsString()
  @IsOptional()
  founderLinkedin?: string

  @IsString()
  @IsOptional()
  startupProfileId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class DocumentationUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  founderName?: string

  @IsString()
  @IsOptional()
  founderEmail?: string

  @IsString()
  @IsOptional()
  founderLinkedin?: string

  @IsString()
  @IsOptional()
  startupProfileId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
