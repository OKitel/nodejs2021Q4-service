import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user123',
        password: 'pass123',
        database: 'rssello',
        entities: ['dist/**/*.entity.js'],
        synchronize: false,
        migrations: ['dist/migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      }).then(async (connection) => {
        await connection.runMigrations();
        return connection;
      }),
  },
];
