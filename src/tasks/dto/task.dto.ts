import { IsString, IsNumber } from 'class-validator';
export class TaskDto {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsNumber()
  order: number;
  @IsString()
  description: string;

  userId: string | null;
  @IsString()
  boardId: string;

  columnId: string | null;
}
