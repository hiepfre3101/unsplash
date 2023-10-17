import style from './UserCollection.module.scss';
import useInfinite from '../../hooks/useInfinite';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useListPhoto from '../../hooks/useListPhoto';
import { PaginationParams } from 'unsplash-js/dist/types/request';
import { instanceServer } from '../../config/unsplash_instance';
import { useCallback, useEffect, useState } from 'react';
import { ICollection } from '../../interface/collection';
import Collection from '../../components/Collection/Collection';
import Tag from '../../components/Tag/Tag';
import Footer from '../../components/Footer/Footer';

type Props = {};

const UserCollection = (props: Props) => {
   const { username } = useParams();
   const location = useLocation();
   const navigate = useNavigate();
   const [collections, setCollections] = useState<ICollection[]>([]);
   const [page, setPage] = useState<number>(1);
   const [visible, setVisible] = useState<boolean>(false);
   const handleLoadMore = useCallback(() => setPage((prev) => prev + 1), []);
   useInfinite({ loadMore: handleLoadMore });
   useEffect(() => {
      (async () => {
         if (username?.trim() === '') return;
         try {
            const res = await instanceServer.users.getCollections({ username: username!, page, perPage: 10 });
            if (res.response?.results.length === 0) {
               setVisible(true);
               return;
            }
            if (collections.length === 0 && page === 1) {
               setCollections(res.response?.results as ICollection[]);
               return;
            }
            setCollections((prev) => [...prev, ...res.response?.results]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [page, username]);
   const handleNavigate = (value: string) => {
      const characters = location.pathname.split('/');
      characters.pop();
      const formatPath = characters.join('/').toString() + '/' + value;
      navigate(formatPath);
   };
   return (
      <div className={style['wrapper']}>
         {collections.map((coll) => (
            <div className={style['collect-wrap']}>
               <Collection coll={coll} />
               <Tag tags={coll.tags} onClick={(value) => handleNavigate(value)} />
            </div>
         ))}
         {visible && <Footer />}
      </div>
   );
};

export default UserCollection;
