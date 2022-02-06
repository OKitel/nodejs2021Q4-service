import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
      await createConnection({
        type: configService.get<'postgres'>('TYPEORM_CONNECTION'),
        port: configService.get<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        entities: [configService.get<string>('TYPEORM_ENTITIES')],
        synchronize:
          configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
        migrations: [configService.get<string>('TYPEORM_MIGRATIONS')],
        cli: {
          migrationsDir: configService.get<string>('TYPEORM_MIGRATIONS_DIR'),
        },
      }).then(async (connection) => {
        await connection.runMigrations();
        return connection;
      }),
  },
];
