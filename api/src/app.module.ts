import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClassesController } from './classes/classes.controller';
import { ClassesService } from './classes/classes.service';
import { DatabaseService } from './database.service';
import { HealthController } from './health.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../.env'] })],
  controllers: [ClassesController, HealthController],
  providers: [DatabaseService, ClassesService],
})
export class AppModule {}
