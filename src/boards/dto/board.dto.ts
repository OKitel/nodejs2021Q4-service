import { ColumnDto } from 'src/columns/dto/column.dto';

export class BoardDto {
  id: string;

  title: string;

  columns: Array<ColumnDto>;
}
