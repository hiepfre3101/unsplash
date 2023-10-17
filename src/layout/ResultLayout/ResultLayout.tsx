import Header from '../../components/Header/Header';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import style from './ResultLayout.module.scss';
import PhotoIcon from '../../assets/icons/PhotoIcon';
import TabTopic, { TopicParams } from '../../components/TabTopic/TabTopic';
import SomePictures from '../../assets/icons/SomePictures';
import GroupUser from '../../assets/icons/GroupUser';
import Select, { ISelect } from '../../components/Select/Select';
import Orient from '../../assets/icons/Orient';
import Sort from '../../assets/icons/Sort';
import { useContext } from 'react';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';

const selectOrientation: ISelect[] = [
   {
      title: 'All',
      value: undefined
   },
   {
      title: 'Landscape',
      value: 'landscape'
   },
   {
      title: 'Portrait',
      value: 'portrait'
   }
];

const selectSort: ISelect[] = [
   {
      title: 'Relevant',
      value: 'relevant'
   },
   {
      title: 'Latest',
      value: 'latest'
   }
];
const ResultLayout = () => {
   const { query } = useParams();
   const location = useLocation();
   const { changeParams, params } = useContext(PhotoContext) as IPhotoState;

   const fakeTopics: TopicParams[] = [
      {
         slug: `/s/photos/${query}`,
         id: 'adsadsad',
         icon: <PhotoIcon width={'18'} height={'18'} />,
         title: 'Photos'
      },
      {
         slug: `/s/collections/${query}`,
         id: 'adsadsad2',
         icon: <SomePictures width={'18'} height={'18'} />,
         title: 'Collections'
      },
      {
         slug: `/s/users/${query}`,
         id: 'adsadsad3',
         icon: <GroupUser width={'18'} height={'18'} />,
         title: 'Users'
      }
   ];

   const checkLocationSearch = (path: string, slug: string) => {
      return path === slug;
   };

   const handleChangeSelect = (type: string, value: string) => {
      // console.log(value);
      // try {
      //    const res = await instanceServer.search.getPhotos({ ...params, query: query!, [type]: value });
      //    setParams((prev) => ({ ...prev, [type]: value }));
      //    handleSetListPhoto(res.response?.results as IPhoto[]);
      // } catch (error) {
      //    console.log(error);
      // }
      changeParams(type, value);
   };
   return (
      <>
         <div className={style['wrapper']}>
            <Header />
            <div className={style['block-bottom']}>
               <TabTopic list={fakeTopics} checkLocation={checkLocationSearch} />
               {location.pathname.includes('/photos') && (
                  <div className={style['filter']}>
                     <Select
                        selectList={selectOrientation}
                        getValue={(value) => handleChangeSelect('orientation', value)}
                        type='Orientation'
                        icon={<Orient width={'18'} height={'18'} />}
                        initValue={selectOrientation.find((option) => option.value === params.orientation)?.title!}
                     />
                     <Select
                        selectList={selectSort}
                        getValue={(value) => handleChangeSelect('orderBy', value)}
                        type='Sort by'
                        icon={<Sort width={'18'} height={'18'} />}
                        initValue={selectSort.find((option) => option.value === params.orderBy)?.title!}
                     />
                  </div>
               )}
            </div>
         </div>
         <Outlet />
      </>
   );
};

export default ResultLayout;
