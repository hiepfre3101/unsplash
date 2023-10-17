import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Search.module.scss';
import StonkIcon from '../../assets/icons/StonkIcon';
import { useClickOutside } from '../../hooks/useClickOutside';
import Button from '../Button/Button';
import TrendBlock from './TrendBlock';
import { ITopic } from '../../interface/topic';
import { instanceServer } from '../../config/unsplash_instance';
import { ICollection } from '../../interface/collection';
import XIcon from '../../assets/icons/XIcon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';

type Props = {
   placeholder: string;
};
const fakeTrendingSearches = ['art', 'beauty', 'sport', 'abstract', 'ocean'];
const Search = ({ placeholder }: Props) => {
   const { query } = useParams();
   const { pushPath } = useContext(PhotoContext) as IPhotoState;
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [value, setValue] = useState<string>('');
   const [topics, setTopics] = useState<ITopic[]>([]);
   const [collections, setCollections] = useState<ICollection[]>([]);
   const wrapRef = useRef(null);
   const navigate = useNavigate();
   useClickOutside(wrapRef, () => {
      setIsOpen(false);
   });
   useEffect(() => {
      setValue(query!);
   }, [query]);
   useEffect(() => {
      if (!isOpen || topics.length > 0) return;
      (async () => {
         try {
            const res = await instanceServer.topics.list({ page: 1, perPage: 5, orderBy: 'latest' });
            setTopics(res.response?.results as ITopic[]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [isOpen]);

   useEffect(() => {
      if (!isOpen || collections.length > 0) return;
      (async () => {
         try {
            const res = await instanceServer.collections.list({ page: 1, perPage: 5 });
            setCollections(res.response?.results as ICollection[]);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [isOpen]);
   const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value.trim() === '') return;
      pushPath('/s/photos/' + value);
      navigate('/s/photos/' + value);
      return;
      // pushPath(`/s/${location.pathname.split('/')[2]}/${value}`.replace(`/`, ''));
      // navigate(`/s/${location.pathname.split('/')[2]}/` + value);
   };
   return (
      <form onSubmit={handleSubmitSearch} className={style['wrapper']} ref={wrapRef} onClick={() => setIsOpen(true)}>
         <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type='text'
            placeholder={placeholder}
            className={style['input']}
         />
         {value && value.trim() !== '' && (
            <button onClick={() => setValue('')} type='button'>
               <XIcon width={'14'} height={'14'} className={style['close-icon']} />
            </button>
         )}
         {isOpen && (
            <div className={style['drop-down']}>
               <TrendBlock title='Trendding Searches'>
                  <div className={style['tab-wrap']}>
                     {fakeTrendingSearches.map((query, index) => (
                        <Link to={`/s/photos/${query}`}>
                           <Button
                              onClick={() => {
                                 setValue(query);
                                 pushPath(`/s/photos/${query}`.replace('/', ''));
                              }}
                              key={index}
                              iconLeft={<StonkIcon width={'20'} height={'20'} className={style['btn-icon']} />}
                           >
                              {query}
                           </Button>
                        </Link>
                     ))}
                  </div>
               </TrendBlock>
               <TrendBlock title='Trending Topics'>
                  <div className={style['tab-wrap']}>
                     {topics.map((topic) => (
                        <Button
                           onClick={() => {
                              navigate('/' + topic.slug);
                              pushPath(`/${topic.slug}`.replace('/', ''));
                           }}
                           className={style['label-left']}
                           key={topic.id}
                           iconLeft={<img src={topic.cover_photo.urls.regular} className={style['img-btn']} />}
                        >
                           {topic.title}
                        </Button>
                     ))}
                  </div>
               </TrendBlock>
               <TrendBlock title='Trendding Collections'>
                  <div className={style['tab-wrap']}>
                     {collections.map((collection) => (
                        <Button
                           onClick={() => {
                              pushPath('/collections/' + collection.id);
                              navigate('/collections/' + collection.id);
                           }}
                           key={collection.id}
                        >
                           {collection.title}
                        </Button>
                     ))}
                  </div>
               </TrendBlock>
            </div>
         )}
      </form>
   );
};

export default Search;
