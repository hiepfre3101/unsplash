import { useContext, useEffect } from 'react';
import { IPhotoState, PhotoContext } from '../context/PhotoContext';

type Params = {
   loadMore: () => void;
};
const useInfinite = ({ loadMore }: Params) => {
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   useEffect(() => {
      if (openModal) return;
      const body = document.body;
      body.style.maxHeight = '1330px';
      const handleLoadMore = () => {
         console.log('scroll');
         // console.log(1, document.documentElement.scrollTop + document.documentElement.clientHeight);
         // console.log(3, body.scrollHeight);
         if (document.documentElement.scrollTop + document.documentElement.clientHeight === body.scrollHeight) {
            loadMore();
            // console.log(1, 'bug');
         }
      };
      document.addEventListener('scroll', handleLoadMore);
      return () => {
         document.removeEventListener('scroll', () => handleLoadMore());
      };
   }, []);
};

export default useInfinite;
