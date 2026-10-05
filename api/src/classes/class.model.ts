import { ApiProperty } from '@nestjs/swagger';

export class ClassRecord {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Turma de DevOps' })
  name!: string;

  @ApiProperty({ example: 'noturno' })
  shift!: string;

  @ApiProperty({ example: 30 })
  capacity!: number;

  @ApiProperty({ example: '05/10/2026', description: 'Data de início no formato DD/MM/YYYY' })
  start_date!: string;
}
