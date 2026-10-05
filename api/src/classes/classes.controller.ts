import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ClassRecord } from './class.model';

@ApiTags('Turmas')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classes: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as turmas' })
  @ApiOkResponse({ type: [ClassRecord] })
  findAll() { return this.classes.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma turma pelo ID' })
  @ApiOkResponse({ type: ClassRecord })
  @ApiNotFoundResponse({ description: 'Turma não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.classes.findOne(id); }

  @Post()
  @ApiOperation({ summary: 'Cadastrar uma turma' })
  @ApiCreatedResponse({ type: ClassRecord })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  create(@Body() dto: CreateClassDto) { return this.classes.create(dto); }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar todos os campos de uma turma' })
  @ApiOkResponse({ type: ClassRecord })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Turma não encontrada' })
  replace(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateClassDto) {
    return this.classes.update(id, dto);

  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar alguns campos de uma turma' })
  @ApiOkResponse({ type: ClassRecord })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Turma não encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClassDto) {
    return this.classes.update(id, dto);

  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir uma turma' })
  @ApiNoContentResponse({ description: 'Turma excluída' })
  @ApiNotFoundResponse({ description: 'Turma não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.classes.remove(id);

  }

}
