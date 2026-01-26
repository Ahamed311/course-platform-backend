import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';

class QuizAnswerDto {
  @IsInt()
  @IsPositive()
  questionId: number;

  @IsInt()
  @IsPositive()
  optionId: number;
}

export class SubmitQuizDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerDto)
  @IsNotEmpty({ each: true })
  answers: QuizAnswerDto[];
}
