import { IsString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string | null;
}
