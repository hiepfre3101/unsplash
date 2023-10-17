import { IPhoto } from './photo';
import { IUser } from './user';

export interface ITopic {
   id: string;
   title: string;
   description: string;
   slug: string;
   cover_photo: Partial<IPhoto>;
   top_contributors: IUser[];
   total: number;
}
