import { Itag } from '../components/Tag/Tag';
import { IPhoto } from './photo';

export interface IUser {
   id: string;
   username: string;
   name: string;
   profile_image: {
      small: string;
      medium: string;
      large: string;
   };
   total_collections: number;
   total_photos: number;
   total_likes: number;
   for_hire: boolean;
   photos: IPhoto[];
   bio: string;
   location: string;
   tags: Itag[];
}
