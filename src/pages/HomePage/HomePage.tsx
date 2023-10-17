import { useContext, useEffect, useState } from 'react';
import style from './HomePage.module.scss';

import { instanceServer } from '../../config/unsplash_instance';
import Hero from '../../components/Hero/Hero';
import Body from '../../components/Body/Body';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Modal from '../../components/Modal/Modal';
import { useLocation } from 'react-router-dom';
import useListPhoto from '../../hooks/useListPhoto';
import { PaginationParams } from 'unsplash-js/dist/types/request';

const HomePage = () => {
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   const [photo, setPhoto] = useState<any>();
   const location = useLocation();
   const { handleSetPage } = useListPhoto<PaginationParams>({
      api: instanceServer.photos.list,
      params: { perPage: 20 },
      pathname: location.pathname.replace('/', '')
   });
   useEffect(() => {
      if (photo) return;
      (async () => {
         try {
            const { response } = await instanceServer.photos.getRandom({ count: 1 });
            if (response ) {
               setPhoto(response as any);
            }
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);

   return (
      <div className={style['wrapper']}>
         <Hero
            photo={photo!}
            title='Unsplash'
            descs={['The internet’s source for visuals.', 'Powered by creators everywhere.']}
         />
         <Body loadMore={handleSetPage} />
         {openModal && <Modal />}
      </div>
   );
};

export default HomePage;
