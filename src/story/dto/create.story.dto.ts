import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  title: string;
  image: string;
  @IsNotEmpty()
  description: string;
  category: string;
}
