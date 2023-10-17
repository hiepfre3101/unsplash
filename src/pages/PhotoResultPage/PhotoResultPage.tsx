import React, { useContext } from 'react';
import style from './PhotoResultPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import useListPhoto from '../../hooks/useListPhoto';
import { instanceServer } from '../../config/unsplash_instance';
import Body from '../../components/Body/Body';
import Modal from '../../components/Modal/Modal';
import { PaginationParams } from 'unsplash-js/dist/types/request';

const PhotoResultPage = () => {
   const { query } = useParams();
   const location = useLocation();
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   const { handleSetPage } = useListPhoto<{ query: string | undefined } & PaginationParams>({
      api: instanceServer.search.getPhotos,
      pathname: location.pathname.replace('/', ''),
      params: { query, perPage: 20 }
   });
   return (
      <div className={style['wrapper']}>
         <Body title={<h1>{query}</h1>} loadMore={handleSetPage} type='infinite' hasTag={true} />
         {openModal && <Modal />}
      </div>
   );
};

export default React.memo(PhotoResultPage);
