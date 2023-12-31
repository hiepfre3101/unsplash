import { Link } from 'react-router-dom';
import { IUser } from '../../interface/user';
import style from './CardUser.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { instanceServer } from '../../config/unsplash_instance';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import { VeryBasic } from 'unsplash-js/dist/methods/photos/types';
type Props = {
   user: IUser;
   isHover: boolean;
};

const CardUser = ({ user, isHover }: Props) => {
   const { pushPath } = useContext(PhotoContext) as IPhotoState;
   const [photos, setPhotos] = useState<VeryBasic[]>([]);
   useEffect(() => {
      if (user.photos || photos.length > 0 || !isHover) return;
      (async () => {
         try {
            const res = await instanceServer.users.get({ username: user.username });
            setPhotos(res.response?.photos as VeryBasic[]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [user, isHover]);
   return (
      <Link
         to={'/user/' + user.username}
         className={style['wrapper']}
         onClick={() => {
            pushPath(location.pathname.replace('/', ''));
            pushPath('/user/' + user.username);
            window.scrollTo(0, 0);
         }}
      >
         <div className={style['profile-wrapper']}>
            <img src={user.profile_image.medium} alt={user.name} className={style['profile-img']} />
            <div className={style['profile-info']}>
               <span className={style['profile-name']}>{user.name}</span>
               <span className={style['profile-username']}>{user.username}</span>
            </div>
            {user.for_hire && <button className={style['hire-btn']}>Hire</button>}
         </div>
         <div className={style['preview-images']}>
            {user.photos
               ? user?.photos.map((photo) => {
                    if (photo) {
                       return <img src={photo.urls.small} alt={photo.alt_description} />;
                    } else return <img src={'https://picsums.photos/500/500'} alt={'desc'} />;
                 })
               : photos.map((photo) => <img src={photo.urls.small} />)}
         </div>
         <Button className={style['btn-view']}>View profile</Button>
      </Link>
   );
};

export default React.memo(CardUser);
