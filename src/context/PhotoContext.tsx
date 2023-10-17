import React, { createContext, useState } from 'react';
import { IPhoto } from '../interface/photo';

export type IParams = {
   orientation: string | undefined;
   orderBy: string | undefined;
};
export type IPhotoState = {
   listPhoto: IPhoto[];
   photo: IPhoto | undefined;
   openModal: boolean;
   triggerModal: (status: boolean) => void;
   handleSetListPhoto: (photos: IPhoto[]) => void;
   handleSetPhoto: (photo: IPhoto) => void;
   addListPhoto: (photos: IPhoto[]) => void;
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
   const [listPhoto, setListPhoto] = useState<IPhoto[]>([]);
   const [photo, setPhoto] = useState<IPhoto>();
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
   const handleSetListPhoto = (photos: IPhoto[]) => {
      setListPhoto(photos);
   };

   const handleSetPhoto = (photo: IPhoto) => {
      setPhoto(photo);
   };

   const addListPhoto = (photos: IPhoto[]) => {
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
