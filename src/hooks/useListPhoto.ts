import { useCallback, useContext, useEffect, useState } from 'react';
import { IParams, IPhotoState, PhotoContext } from '../context/PhotoContext';
import { IPhoto } from '../interface/photo';

type Params<P> = {
   ahyhy?: P;
   pathname: string; //need remove first prefix, get the path only
   params: any & { query: string };
   api: (params: any) => any;
   needFilter?: boolean;
};
const useListPhoto = <P>({ api, pathname, params, needFilter = true }: Params<P>) => {
   const {
      listPhoto,
      handleSetListPhoto,
      addListPhoto,
      historyPaths,
      removePath,
      params: filter,
      openModal
   } = useContext(PhotoContext) as IPhotoState;
   const [page, setPage] = useState<number>(1);
   const [visible, setVisible] = useState<boolean>(false);
   const [search, setSearch] = useState<string | undefined>(undefined);
   const [lastFilter, setLastFilter] = useState<IParams>({ orderBy: 'relevant', orientation: undefined });
   // console.log(4, lastFilter.orderBy, filter.orderBy);
   // console.log(5, lastFilter.orientation, filter.orientation);
   useEffect(() => {
      if (!params.query || search === params.query) return;
      setSearch(params.query);
      setPage(1);
   }, [params]);
   useEffect(() => {
      if (
         (!filter.orderBy && !filter.orientation) ||
         (filter.orderBy === lastFilter.orderBy && filter.orientation === lastFilter.orientation)
      )
         return;
      setLastFilter(filter);
      setPage(1);
   }, [filter, params]);
   useEffect(() => {
      console.log(3, pathname === historyPaths[historyPaths.length - 1], pathname);
      // console.log(2,listPhoto.length === 0 && page === 1);
      if (openModal || visible) return;
      (async () => {
         try {
            const res = await api(needFilter ? { ...params, ...filter, page } : { ...params, page });
            if (res.response?.results.length === 0) {
               if (historyPaths[historyPaths.length - 1] === pathname) {
                  handleSetListPhoto([]);
               }
               setVisible(true);
               return;
            }
            if (
               (listPhoto.length === 0 && page === 1) ||
               historyPaths[historyPaths.length - 1] === pathname ||
               lastFilter.orderBy !== filter.orderBy ||
               lastFilter.orientation !== filter.orientation ||
               params.query !== search
            ) {
               // console.log(2, 'set');
               handleSetListPhoto(res.response?.results as IPhoto[]);
               removePath(pathname);
               return;
            }
            // console.log(3, 'add');
            addListPhoto(res.response?.results as IPhoto[]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [page, pathname, filter]);
   const handleSetPage = useCallback(
      () =>
         setPage((prev) => {
            return prev + 1;
         }),
      []
   );
   return { handleSetPage, visible };
};

export default useListPhoto;
