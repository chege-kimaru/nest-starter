import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryController } from './story.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Story } from './story.model';
import { SharedModule } from '../shared/shared.module';
import { StoryMiddleware } from './middleware/story.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Story]),
    AuthModule,
    SharedModule
  ],
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoryModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(StoryMiddleware)
      .exclude(
        {path: 'stories', method: RequestMethod.GET},
        {path: 'stories', method: RequestMethod.POST},
      )
      .forRoutes(StoryController)
  }

}
