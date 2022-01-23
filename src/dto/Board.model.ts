import { Column } from './Column.model';

export const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: { type: 'array', items: Column },
  },
};
