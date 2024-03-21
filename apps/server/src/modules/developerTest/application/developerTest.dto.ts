import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class DeveloperTestCreateDto {
  @IsBoolean()
  @IsOptional()
  passed?: boolean

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  developerRequirementId?: string

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

export class DeveloperTestUpdateDto {
  @IsBoolean()
  @IsOptional()
  passed?: boolean

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  developerRequirementId?: string

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
