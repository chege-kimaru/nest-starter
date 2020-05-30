import {
  Body,
  Controller, Delete,
  Get,
  Logger,
  Patch,
  Post, Put, Req,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateStoryDto } from './dto/create.story.dto';
import { StoryService } from './story.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryConfigService } from '../shared/cloudinary-config.service';
import { UpdateStoryDto } from './dto/update.story.dto';
import { Request } from 'express';
import { Roles } from '../auth/guards/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('stories')
export class StoryController {

  constructor(private storyService: StoryService,
              private cloudinary: CloudinaryConfigService) {
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  @Post()
  async createStory(@Body() story: CreateStoryDto, @UploadedFile() file) {
    const image = await this.cloudinary.uploadBase64File(file.buffer, file.originalname);
    story.image = image.secure_url;
    Logger.verbose(file.originalname);
    return this.storyService.createStory(story);
  }

  @Get()
  getAllStories() {
    return this.storyService.getAllStories();
  }

  @Get(':storyId')
  getStoryById(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return req.Story;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':storyId')
  updateStory(@Req() req: Request, @Body() story: UpdateStoryDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.storyService.updateStory(req.Story, story);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':storyId')
  deleteStory(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.storyService.deleteStory(req.Story);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  @Patch(':storyId/image')
  async updateStoryImage(@Req() req: Request, @UploadedFile() file) {
    const image = await this.cloudinary.uploadBase64File(file.buffer, file.originalname);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.storyService.updateStoryImage(req.Story, image.secure_url);
  }
}
