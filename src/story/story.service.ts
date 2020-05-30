import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Story } from './story.model';
import { CreateStoryDto } from './dto/create.story.dto';
import { UpdateStoryDto } from './dto/update.story.dto';
import { CloudinaryConfigService } from '../shared/cloudinary-config.service';

@Injectable()
export class StoryService {

  constructor(@InjectModel(Story) private storyModel: typeof Story,
              private cloudinary: CloudinaryConfigService) {
  }

  async createStory(story: CreateStoryDto): Promise<Story> {
    return this.storyModel.create(story);
  }

  async getAllStories(): Promise<Story[]> {
    return this.storyModel.findAll();
  }

  async getById(id: string): Promise<Story> {
    return this.storyModel.findByPk(id);
  }

  async updateStory(story: Story, storyData: UpdateStoryDto): Promise<Story> {
    return story.update(storyData);
  }

  async deleteStoryImage(story: Story) {
    try {
      if (story.image) {
        const storyImage = story.image;
        const imageId = storyImage.substr(storyImage.lastIndexOf('/') + 1,
          storyImage.lastIndexOf('.') - storyImage.lastIndexOf('/') - 1);
        await this.cloudinary.deleteFile(imageId);
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteStory(story: Story): Promise<void> {
    await this.deleteStoryImage(story);
    return story.destroy();
  }

  async updateStoryImage(story: Story, image: string): Promise<Story> {
    try {
      await this.deleteStoryImage(story);
      return story.update({ image });
    } catch (e) {
      throw e;
    }
  }
}
