import style from './UserPhoto.module.scss';
import Body from '../../components/Body/Body';
import useListPhoto from '../../hooks/useListPhoto';
import { instanceServer } from '../../config/unsplash_instance';
import { useLocation, useParams } from 'react-router-dom';
import { PaginationParams } from 'unsplash-js/dist/types/request';
import useInfinite from '../../hooks/useInfinite';

const UserPhoto = () => {
   const { username } = useParams();
   const location = useLocation();
   const { handleSetPage } = useListPhoto<PaginationParams & { username: string }>({
      api: instanceServer.users.getPhotos,
      params: { perPage: 10, username: username! },
      pathname: location.pathname,
      needFilter: false
   });
   useInfinite({ loadMore: handleSetPage });
   return (
      <div className={style['wrapper']}>
         <Body />
      </div>
   );
};

export default UserPhoto;
