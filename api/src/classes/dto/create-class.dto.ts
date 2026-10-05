import { Transform } from 'class-transformer';
import { isISO8601, IsIn, IsInt, IsString, Length, Max, Min, ValidateBy } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'Turma de DevOps', minLength: 1, maxLength: 120 })
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @Length(1, 120)
  name!: string;

  @ApiProperty({ enum: ['matutino', 'vespertino', 'noturno'], example: 'noturno' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  @IsIn(['matutino', 'vespertino', 'noturno'])
  shift!: string;

  @ApiProperty({ example: 30, minimum: 1, maximum: 2147483647 })
  @IsInt()
  @Min(1)
  @Max(2147483647)
  capacity!: number;

  @ApiProperty({ example: '05/10/2026', type: String, description: 'Data de início no formato DD/MM/YYYY' })
  @ValidateBy({
    name: 'dataBrasileira',
    validator: {
      validate: (value: unknown) => typeof value === 'string'
        && /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(value)
        && isISO8601(value.split('/').reverse().join('-'), { strict: true }),
      defaultMessage: () => 'start_date deve ser uma data válida no formato DD/MM/YYYY',
    },
  })
  start_date!: string;
}
