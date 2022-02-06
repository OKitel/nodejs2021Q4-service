import { ColumnDto } from 'src/columns/dto/column.dto';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BoardDto {
  id: string;

  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns: Array<ColumnDto>;
}
