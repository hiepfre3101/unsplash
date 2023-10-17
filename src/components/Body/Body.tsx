import React, { useContext } from 'react';
import style from './Body.module.scss';
import Photo from '../Photo/Photo';
import { IUser } from '../../interface/user';
import UserBlock from '../CardUser/UserBlock/UserBlock';
import useInfinite from '../../hooks/useInfinite';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Tag from '../Tag/Tag';
import { useLocation, useNavigate } from 'react-router-dom';
type Props = {
   photos?: any;
   loadMore?: () => void;
   type?: 'infinite' | 'limit';
   title?: string | React.ReactElement;
   displayColabs?: IUser[];
   hasTag?: boolean;
   className?: string;
};

const Body = ({ className, hasTag = false, loadMore, type = 'infinite', title, displayColabs, photos }: Props) => {
   const { listPhoto } = useContext(PhotoContext) as IPhotoState;
   const location = useLocation();
   type === 'infinite' && loadMore && useInfinite({ loadMore });
   const navigate = useNavigate();
   if (listPhoto.length === 0) {
      return (
         <div className={style['no-data']}>
            <img src='https://cdn-icons-png.flaticon.com/512/6598/6598519.png' alt='' />
         </div>
      );
   }
   const handleNavigate = (value: string) => {
      const characters = location.pathname.split('/');
      characters.pop();
      const formatPath = characters.join('/').toString() + '/' + value;
      navigate(formatPath);
   };
   return (
      <div className={`${style['wrapper']} ${className}`}>
         <span className={style['title']}>{title}</span>
         <div className={style['body']}>
            {displayColabs && (
               <div className={style['colab-wrapper']}>
                  <strong>Top Contributors</strong>
                  <div className={style['list-colab']}>
                     {displayColabs.map((contributor) => (
                        <UserBlock user={contributor} />
                     ))}
                  </div>
               </div>
            )}
            {photos
               ? photos.map((photo: any) => (
                    <div className={style['photo-wrap']}>
                       <Photo photo={photo} key={photo.id} />
                       {hasTag && photo.tags && <Tag tags={photo.tags} onClick={(value) => handleNavigate(value)} />}
                    </div>
                 ))
               : listPhoto.map((photo: any) => (
                    <div className={style['photo-wrap']}>
                       <Photo photo={photo} key={photo.id} />
                       {hasTag && photo.tags && <Tag tags={photo.tags} onClick={(value) => handleNavigate(value)} />}
                    </div>
                 ))}
         </div>
      </div>
   );
};

export default React.memo(Body);
