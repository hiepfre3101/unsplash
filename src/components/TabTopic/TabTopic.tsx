import React, { useContext } from 'react';
import { ITopic } from '../../interface/topic';
import style from './TabTopic.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
export type TopicParams = Partial<ITopic> & { icon?: React.ReactElement };
type Props = {
   list: Partial<ITopic>[] | TopicParams[];
   hasShrink?: boolean;
   checkLocation: (path: string, slug: string) => boolean;
};

const TabTopic = ({ list, hasShrink, checkLocation }: Props) => {
   const location = useLocation();
   const { removePath, historyPaths, pushPath } = useContext(PhotoContext) as IPhotoState;

   const handlePaths = (slug: string) => {
      if (historyPaths.includes(slug)) {
         removePath(slug);
      }
      pushPath(slug);
      window.scrollTo(0, 0);
   };

   return (
      <div className={`${style['wrapper']} `}>
         {list.map((item:any) => (
            <Link
               onClick={() => handlePaths(item.slug!)}
               key={item.id}
               to={item.slug!}
               className={`${style['tab']} ${
                  (checkLocation(location.pathname, item.slug!) && style['tab-underline']) ||
                  (item.slug === location.pathname.replace('/', '') && style['tab-underline'])
               }`}
            >
               <span
                  className={`${style['tab-title']} ${
                     (checkLocation(location.pathname, item.slug!) && style['tab-active']) ||
                     (item.slug === location.pathname.replace('/', '') && style['tab-active'])
                  }`}
               >
                  {item.icon}
                  {item.title}
                  <span>{item.total && item.total}</span>
               </span>
            </Link>
         ))}
         {hasShrink && <div className={style['shrink']}></div>}
      </div>
   );
};

export default TabTopic;
