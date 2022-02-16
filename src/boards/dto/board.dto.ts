import { ColumnDto } from 'src/columns/dto/column.dto';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ isArray: true, type: ColumnDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns: Array<ColumnDto>;
}
