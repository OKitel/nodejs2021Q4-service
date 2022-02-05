import { ColumnDto } from 'src/columns/dto/column.dto';
import { IsString, IsArray } from 'class-validator';

export class BoardDto {
  id: string;

  @IsString()
  title: string;

  @IsArray()
  columns: Array<ColumnDto>;
}
