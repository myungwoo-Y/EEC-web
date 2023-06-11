import { configService } from 'src/config/config.service';
import { DataSource } from 'typeorm';
import { User } from 'src/model/user.entity';
import { Board } from 'src/model/board.entity';
import { BoardCategory } from 'src/model/boardCategory.entity';


export default new DataSource({
  type: 'postgres',
  host: configService.getValue('POSTGRES_HOST'),
  port: parseInt(configService.getValue('POSTGRES_PORT')),
  username: configService.getValue('POSTGRES_USER'),
  password: configService.getValue('POSTGRES_PASSWORD'),
  database: configService.getValue('POSTGRES_DATABASE'),
  entities: [User, Board, BoardCategory],
  migrationsTableName: 'eec_web_migration',
  migrations: ['migrations/*{.ts,.js}'],
  synchronize: false,
});
