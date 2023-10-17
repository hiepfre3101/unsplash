import { useCallback, useEffect, useState } from 'react';
import style from './CollectionResultPage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { instanceServer } from '../../config/unsplash_instance';
import useInfinite from '../../hooks/useInfinite';
import Tag from '../../components/Tag/Tag';
import Collection from '../../components/Collection/Collection';

const CollectionResultPage = () => {
   const { query } = useParams();
   const [lastQuery, setLastQuery] = useState<string | undefined>('');
   const [collections, setCollections] = useState<any>([]);
   const [page, setPage] = useState<number>(1);
   const navigate = useNavigate();
   const handleLoadMore = useCallback(() => setPage((prev) => prev + 1), []);
   useInfinite({ loadMore: handleLoadMore });
   useEffect(() => {
      (async () => {
         if (query?.trim() === '') return;
         try {
            const res = await instanceServer.search.getCollections({ query: query!, page });
            if ((collections.length === 0 && page === 1) || query !== lastQuery) {
               setCollections(res.response?.results);
               setLastQuery(query);
               return;
            }
            setCollections((prev: any) => [...prev, ...(res.response?.results as any)]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [page, query]);
   const handleNavigate = (value: string) => {
      const characters = location.pathname.split('/');
      characters.pop();
      const formatPath = characters.join('/').toString() + '/' + value;
      navigate(formatPath);
   };
   return (
      <div className={style['wrapper']}>
         <h1 className={style['title']}>{query}</h1>
         <div className={style['body']}>
            {collections.map((coll: any) => (
               <div className={style['collect-wrap']}>
                  <Collection coll={coll} />
                  <Tag tags={coll.tags} onClick={(value) => handleNavigate(value)} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default CollectionResultPage;
