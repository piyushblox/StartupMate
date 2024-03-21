import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TutorialInteractionCreateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  tutorialId?: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class TutorialInteractionUpdateDto {
  @IsString()
  @IsOptional()
  type?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsOptional()
  tutorialId?: string

  @IsString()
  @IsOptional()
  userId?: string

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
