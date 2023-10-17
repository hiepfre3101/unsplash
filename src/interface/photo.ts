import { IUser } from './user';

export interface IPhoto {
   id: string;
   width: string;
   height: string;
   downloads: number;
   views: number;
   likes: number;
   description: string;
   alt_description: string;
   exif: {
      name: string;
      make: string;
      model: string;
   };
   urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
   };
   user: IUser;
   tags: { title: string; type: string }[];
   current_user_collections: {
      id: string;
   };
   color: string;
   location: {
      city: string;
      country: string;
   };
   created_at: string;
   related_collections: {
      total: number;
      results: {
         id: string;
         title: string;
         total_photos: number;
         user: IUser;
      }[];
   };
   links: {
      download: string;
      download_location: string;
   };
}
