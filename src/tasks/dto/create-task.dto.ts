import { IsString, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsNumber()
  order: number;
  @IsString()
  description: string;

  userId: string | null;

  columnId: string | null;
}
