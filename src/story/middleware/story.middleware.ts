import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { StoryService } from '../story.service';

@Injectable()
export class StoryMiddleware implements NestMiddleware {
  constructor(private storyService: StoryService) {
  }

  async use(req: Request, res: Response, next: Function) {
    try {
      const story = await this.storyService.getById(req.params.storyId);
      if(story && story.id) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        req.Story = story;
        next();
      } else {
        throw new NotFoundException('This story does not exist');
      }
    } catch (e) {
      throw e;
    }
  }
}
