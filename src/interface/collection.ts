import { Itag } from '../components/Tag/Tag';
import { IPhoto } from './photo';
import { IUser } from './user';

export interface ICollection {
   id: string;
   title: string;
   description: string;
   slug: string;
   urls: {
      raw: string;
      small: string;
      regular: string;
   };
   total_photos: number;
   cover_photo: IPhoto;
   tags: Itag[];
   user: IUser;
   preview_photos: IPhoto[];
}
