import { BaseEntity } from '@/../server/src/model/base.entity';
import Class from '../../server/src/model/class.entity';
export type NewClass = Omit<Class, keyof BaseEntity | 'thumbnailImage'> & {
  thumbnailImage: File;
};