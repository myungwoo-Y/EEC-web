import { IsBoolean, IsString, IsNotEmpty } from 'class-validator';
import File from 'src/model/file.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  categoryId: number;

  files: File[]
}


export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  postId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  categoryId: number;

  files: File[]
}

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  userId: number;
}

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  commentId: string;
}
