import { User as SUser } from "@/../server/src/model/user.entity";

export type User = Omit<SUser, 'classOrder'> & {
  classOrder: number | string;
}

export type CreateUser = Partial<User>

export enum UserType {

}