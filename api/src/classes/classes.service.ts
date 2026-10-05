import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRecord } from './class.model';

@Injectable()
export class ClassesService {
  constructor(private readonly database: DatabaseService) {}

  private readonly columns = "id, name, shift, capacity, TO_CHAR(start_date, 'DD/MM/YYYY') AS start_date";

  async findAll() {
    const result = await this.database.query<ClassRecord>(
      `SELECT ${this.columns} FROM classes ORDER BY id`,
    );
    return result.rows;
  }

  async findOne(id: number) {
    const result = await this.database.query<ClassRecord>(
      `SELECT ${this.columns} FROM classes WHERE id = $1`, [id],
    );
    if (!result.rows[0]) throw new NotFoundException('Turma não encontrada.');
    return result.rows[0];
  }

  async create(dto: CreateClassDto) {
    const result = await this.database.query<ClassRecord>(
      `INSERT INTO classes (name, shift, capacity, start_date)
      VALUES ($1, $2, $3, $4) RETURNING ${this.columns}`,
      [dto.name, dto.shift, dto.capacity, dto.start_date.split('/').reverse().join('-')],
    );
    return result.rows[0];
  }

  async update(id: number, dto: UpdateClassDto) {
    const fields = (['name', 'shift', 'capacity', 'start_date'] as const)
      .filter((field) => dto[field] !== undefined);
    if (!fields.length) throw new BadRequestException('Informe pelo menos um campo para atualizar.');

    const assignments = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values: unknown[] = fields.map((field) => field === 'start_date'
      ? dto.start_date!.split('/').reverse().join('-') : dto[field]);
    values.push(id);
    const result = await this.database.query<ClassRecord>(
      `UPDATE classes SET ${assignments} WHERE id = $${values.length} RETURNING ${this.columns}`,
      values,
    );
    if (!result.rows[0]) throw new NotFoundException('Turma não encontrada.');
    return result.rows[0];
  }

  async remove(id: number) {
    const result = await this.database.query('DELETE FROM classes WHERE id = $1', [id]);
    if (!result.rowCount) throw new NotFoundException('Turma não encontrada.');
  }
}
