import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {
}
