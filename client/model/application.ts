import { Class } from './class';
import { BaseEntity } from './common';
import { User } from './user';

export type Application = {
  applicationId: number;

  classOrder: number;

  class?: Class;

  user?: User;
} & BaseEntity;

export type CheckedApplication = Application & { checked: boolean };
