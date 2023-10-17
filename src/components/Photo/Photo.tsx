import React, { useContext } from 'react';
import style from './Photo.module.scss';
import PlusIcon from '../../assets/icons/PlusIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import ArrowDown from '../../assets/icons/ArrowDown';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';

type Props = {
   photo: any;
};

const Photo = ({ photo }: Props) => {
   const { triggerModal, triggerReloadModal } = useContext(PhotoContext) as IPhotoState;
   const handleClickPhoto = (id: string) => {
      triggerReloadModal(id);
      triggerModal(true);
   };

   return (
      <div>
         <div className={style['photo']} key={photo.id} onClick={() => handleClickPhoto(photo.id)}>
            <img
               loading='lazy'
               title={photo.description!}
               src={photo.urls.regular}
               alt={photo.description!}
               className={style['photo-img']}
            />
            <div className={style['overlay']}>
               <div className={style['overlay-head']}>
                  <button type='button' className={style['head-btn']}>
                     <PlusIcon className={style['overlay-icon']} />
                  </button>
                  <button type='button' className={style['head-btn']}>
                     <HeartIcon className={style['overlay-icon']} />
                  </button>
               </div>
               <div className={style['overlay-foot']}>
                  <div className={style['profile-wrapper']}>
                     <img
                        src={photo.user.profile_image.medium}
                        alt={photo.user.name}
                        className={style['profile-img']}
                     />
                     <span className={style['profile-name']}>{photo.user.name}</span>
                  </div>
                  <button type='button' className={style['head-btn']}>
                     <ArrowDown className={style['overlay-icon']} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default React.memo(Photo);
