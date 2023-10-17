import React, { createContext, useState } from 'react';
import { Full } from 'unsplash-js/dist/methods/topics/types';
import { Basic } from 'unsplash-js/dist/methods/users/types';

export type IParams = {
   orientation: string | undefined;
   orderBy: string | undefined;
};
export type IPhotoState = {
   listPhoto: any;
   photo: any;
   openModal: boolean;
   triggerModal: (status: boolean) => void;
   handleSetListPhoto: (photos: any) => void;
   handleSetPhoto: (photo: any) => void;
   addListPhoto: (photos: any) => void;
   idPhoto: string;
   triggerReloadModal: (id: string) => void;
   historyPaths: string[];
   pushPath: (path: string) => void;
   removePath: (path: string) => void;
   params: IParams;
   changeParams: (type: string, value: string | undefined) => void;
};

export const PhotoContext = createContext<IPhotoState | null>(null);

type Props = {
   children: React.ReactElement;
};
const PhotoProvider = ({ children }: Props) => {
   const [listPhoto, setListPhoto] = useState<Basic[]>([]);
   const [photo, setPhoto] = useState<Full | undefined>();
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [idPhoto, setIdPhoto] = useState<string>('');
   const [historyPaths, setHistoryPaths] = useState<string[]>(['']);
   const [params, setParams] = useState<IParams>({ orderBy: 'relevant', orientation: undefined });
   const triggerModal = (status: boolean) => {
      setOpenModal(status);
   };
   const triggerReloadModal = (id: string) => {
      setIdPhoto(id);
   };
   const handleSetListPhoto = (photos: Basic[]) => {
      setListPhoto(photos);
   };

   const handleSetPhoto = (photo: Full) => {
      setPhoto(photo);
   };

   const addListPhoto = (photos: Basic[]) => {
      setListPhoto((prev) => [...prev, ...photos]);
   };
   const pushPath = (path: string) => {
      return setHistoryPaths((prev) => [...prev, path]);
   };
   const removePath = (pathInput: string) => {
      setHistoryPaths((prev) => [...prev.filter((path) => path !== pathInput)]);
   };
   const changeParams = (type: string, value: string | undefined) => {
      console.log(type, value);
      setParams((prev) => ({ ...prev, [type]: value }));
   };
   const returnObj: IPhotoState = {
      listPhoto,
      photo,
      handleSetListPhoto,
      handleSetPhoto,
      openModal,
      triggerModal,
      addListPhoto,
      idPhoto,
      triggerReloadModal,
      historyPaths,
      pushPath,
      removePath,
      params,
      changeParams
   };

   return <PhotoContext.Provider value={returnObj}>{children}</PhotoContext.Provider>;
};

export default PhotoProvider;
