import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsPositive()
  courseId: number;
}

