export const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'number' },
    description: { type: 'string' },
    userId: { type: 'string', nullable: true },
    boardId: { type: 'string' },
    columnId: { type: 'string', nullable: true },
  },
};
