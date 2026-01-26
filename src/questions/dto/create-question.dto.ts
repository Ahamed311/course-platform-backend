import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsInt()
  @IsPositive()
  quizId: number;
}

