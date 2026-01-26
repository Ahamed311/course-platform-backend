import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsInt()
  @IsPositive()
  questionId: number;
}
