import { BaseEntity } from '@/../server/src/model/base.entity';
import ServerClass from '../../server/src/model/class.entity';
export type NewClass = Omit<
  ServerClass,
  keyof BaseEntity | 'thumbnailImage'
> & {
  thumbnailImage: File;
};

export type Class = Omit<
  ServerClass,
  'classStart' | 'classEnd' | 'registerStart' | 'registerEnd'
> & {
  classStart: string;
  classEnd: string;
  registerStart: string;
  registerEnd: string;
};
