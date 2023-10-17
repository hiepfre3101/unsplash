import style from './DetailCollection.module.scss';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Share from '../../assets/icons/Share';
import DotIcon from '../../assets/icons/Dot';
import { useContext, useEffect, useState } from 'react';
import { ICollection } from '../../interface/collection';
import { useLocation, useParams } from 'react-router-dom';
import { instanceServer } from '../../config/unsplash_instance';
import Body from '../../components/Body/Body';
import useListPhoto from '../../hooks/useListPhoto';
import { PaginationParams } from 'unsplash-js/dist/types/request';
import useInfinite from '../../hooks/useInfinite';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Modal from '../../components/Modal/Modal';

const DetailCollection = () => {
   const [collection, setCollection] = useState<ICollection>();
   const { id } = useParams();
   const location = useLocation();
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   useEffect(() => {
      (async () => {
         if (!id) return;
         try {
            const res = await instanceServer.collections.get({ collectionId: id! });
            setCollection(res.response);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [id]);
   const { handleSetPage } = useListPhoto<PaginationParams & { collectionId: string }>({
      api: instanceServer.collections.getPhotos,
      params: { perPage: 20, collectionId: id! },
      pathname: location.pathname
   });
   useInfinite({ loadMore: handleSetPage });
   return (
      <div className={style['wrapper']}>
         <Header />
         <div
            className={style['banner']}
            style={{
               backgroundImage: `url(${collection?.cover_photo.urls.regular})`,
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               backgroundSize: '100%'
            }}
         >
            <div className={style['overlay']}></div>
            <div className={style['head']}>
               <div className={style['head-left']}>
                  <span style={{ fontSize: '50px', fontWeight: '500', width: '100%' }}>{collection?.title}</span>
                  <div className={style['user-block']}>
                     <div className={style['img-wrap']}>
                        <img src={collection?.user.profile_image.small} alt='' />
                     </div>
                     <span className={style['username']}>{collection?.user.name}</span>
                  </div>
               </div>{' '}
               <div className={style['actions']}>
                  <Button className={style['btn-action']} iconLeft={<Share width={'14'} height={'14'} />}>
                     Share
                  </Button>
                  <Button className={style['btn-action']}>
                     <DotIcon width={'14'} height={'14'} />
                  </Button>
               </div>
            </div>
         </div>
         <Body className={style['body']} title={collection?.total_photos.toString() + ' photos'} />
         {openModal && <Modal />}
      </div>
   );
};

export default DetailCollection;
