import { configService } from 'src/config/config.service';
import { DataSource } from 'typeorm';
import { User } from 'src/model/user.entity';


export default new DataSource({
  type: 'postgres',
  host: configService.getValue('POSTGRES_HOST'),
  port: parseInt(configService.getValue('POSTGRES_PORT')),
  username: configService.getValue('POSTGRES_USER'),
  password: configService.getValue('POSTGRES_PASSWORD'),
  database: configService.getValue('POSTGRES_DATABASE'),
  entities: [User],
  migrationsTableName: 'eec_web_migration',
  migrations: ['src/migration/**/*{.ts,.js}'],
  synchronize: false,
});
