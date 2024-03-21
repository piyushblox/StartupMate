import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class TestAnswerCreateDto {
  @IsString()
  @IsOptional()
  answerText?: string

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean

  @IsString()
  @IsOptional()
  questionId?: string

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

export class TestAnswerUpdateDto {
  @IsString()
  @IsOptional()
  answerText?: string

  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean

  @IsString()
  @IsOptional()
  questionId?: string

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
