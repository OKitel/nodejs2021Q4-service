import { IsString, IsNumber } from 'class-validator';

export class ColumnDto {
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  order: number;
}
