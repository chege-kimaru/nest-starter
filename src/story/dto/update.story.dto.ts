import { IsNotEmpty } from 'class-validator';

export class UpdateStoryDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  category: string;
}
