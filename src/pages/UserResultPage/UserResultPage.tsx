import { useCallback, useEffect, useState } from 'react';
import style from './UserResultPage.module.scss';
import { IUser } from '../../interface/user';
import { instanceServer } from '../../config/unsplash_instance';
import { useParams } from 'react-router-dom';
import CardUser from '../../components/CardUser/CardUser';
import useInfinite from '../../hooks/useInfinite';

const UserResultPage = () => {
   const [users, setUsers] = useState<IUser[]>([]);
   const [page, setPage] = useState<number>(1);
   const [lastQuery, setLastQuery] = useState<string | undefined>('');
   const { query } = useParams();
   const handleChangePage = useCallback(() => setPage((prev) => prev + 1), [query]);
   useInfinite({ loadMore: handleChangePage });
   useEffect(() => {
      (async () => {
         try {
            const res = await instanceServer.search.getUsers({ query: query || '', page });
            if ((users.length === 0 && page === 1) || query !== lastQuery) {
               setUsers(res.response?.results);
               setLastQuery(query);
               return;
            }
            setUsers((prev) => [...prev, ...res.response?.results]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [page, query]);
   return (
      <div className={style['wrapper']}>
         <h1 className={style['title']}>{query}</h1>
         <div className={style['body']}>
            {users.map((user) => (
               <CardUser key={user.id} user={user} />
            ))}
         </div>
      </div>
   );
};

export default UserResultPage;
