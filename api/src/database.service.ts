import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: Pool;

  constructor(config: ConfigService) {
    this.pool = new Pool({
      host: config.getOrThrow<string>('DB_HOST'),
      port: Number(config.get('DB_PORT') ?? 5432),
      user: config.getOrThrow<string>('POSTGRES_USER'),
      password: config.getOrThrow<string>('admin'),
      database: config.getOrThrow<string>('POSTGRES_DB'),
      connectionTimeoutMillis: 5000,
    });
  }

  async onModuleInit() { await this.pool.query('SELECT 1'); }

  query<T extends QueryResultRow = QueryResultRow>(sql: string, values: unknown[] = []) {
    return this.pool.query<T>(sql, values);
  }

  async onModuleDestroy() { await this.pool.end(); }
}
