import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { ITopic } from '../../interface/topic';
import style from './DefaultLayout.module.scss';
import { useEffect, useState } from 'react';
import { instanceServer } from '../../config/unsplash_instance';
import TabTopic from '../../components/TabTopic/TabTopic';
const fakeTopics: ITopic[] = [
   {
      id: 'sdadiadia',
      description: 'Editorial',
      cover_photo: {
         id: 'adaddadsadas',
         urls: {
            raw: 'https://picsum.photos/100/100',
            full: 'https://picsum.photos/100/100',
            regular: 'https://picsum.photos/100/100',
            small: 'https://picsum.photos/100/100'
         }
      },
      slug: '',
      title: 'Editorial',
      top_contributors: []
   },
   {
      id: 'sdadiadia12132',
      description: 'Unsplash+',
      cover_photo: {
         id: 'adaddadsadas12312',
         urls: {
            raw: 'https://picsum.photos/100/100',
            full: 'https://picsum.photos/100/100',
            regular: 'https://picsum.photos/100/100',
            small: 'https://picsum.photos/100/100'
         }
      },
      slug: '/plus/new',
      title: 'Unsplash+',
      top_contributors: []
   }
];
const DefaultLayout = () => {
   const [topics, setTopics] = useState<ITopic[]>([]);
   useEffect(() => {
      (async () => {
         try {
            const res = await instanceServer.topics.list({ page: 1, perPage: 10, orderBy: 'featured' });
            setTopics(res.response?.results as ITopic[]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);
   const checkLocationDefaul = (path: string, slug: string) => {
      return path.replace('/', '') === slug;
   };
   return (
      <>
         <div className={style['wrapper']}>
            <Header />
            <div className={style['block-bottom']}>
               <TabTopic list={fakeTopics} hasShrink checkLocation={checkLocationDefaul} />
               <TabTopic list={topics} checkLocation={checkLocationDefaul} />
            </div>
         </div>
         <Outlet />
         <div id='modal'></div>
      </>
   );
};

export default DefaultLayout;
