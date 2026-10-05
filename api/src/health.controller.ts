import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DatabaseService } from './database.service';

@ApiTags('Status')
@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar a API e a conexão com o banco' })
  async health() {
    await this.database.query('SELECT 1');
    return { status: 'ok', database: 'connected' };
  }
}
