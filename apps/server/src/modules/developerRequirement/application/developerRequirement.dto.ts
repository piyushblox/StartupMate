import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DeveloperRequirementCreateDto {
  @IsString()
  @IsOptional()
  requirementText?: string

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

export class DeveloperRequirementUpdateDto {
  @IsString()
  @IsOptional()
  requirementText?: string

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
