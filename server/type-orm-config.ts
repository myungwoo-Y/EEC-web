import { Certification } from './src/model/certification.entity';
import { configService } from 'src/config/config.service';
import { DataSource } from 'typeorm';
import { User } from 'src/model/user.entity';
import { Post } from 'src/model/post.entity';
import { PostCategory } from 'src/model/postCategory.entity';
import File from 'src/model/file.entity';
import Class from 'src/model/class.entity';
import Curriculum from 'src/model/curriculum.entity';
import Lecture from 'src/model/lecture.entity';
import { Application } from 'src/model/application.entity';
import { Comment } from 'src/model/comment.entity';

const isProd = process.env.NODE_ENV === 'PROD';

export default new DataSource({
  type: 'postgres',
  host: configService.getValue('POSTGRES_HOST'),
  schema: isProd ? 'eec' : 'public',
  
  port: parseInt(configService.getValue('POSTGRES_PORT')),
  username: configService.getValue('POSTGRES_USER'),
  password: configService.getValue('POSTGRES_PASSWORD'),
  database: configService.getValue('POSTGRES_DATABASE'),
  entities: [User, Post, PostCategory, File, Class, Curriculum, Lecture, Certification, Application, Comment],
  migrationsTableName: 'eec_web_migration',
  migrations: [isProd ? 'migrations-prod/*{.ts,.js}' : 'migrations/*{.ts,.js}'],
  synchronize: false,
});
