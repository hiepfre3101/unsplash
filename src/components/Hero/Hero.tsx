import React from 'react';
import style from './Hero.module.scss';
import GlassIcon from '../../assets/icons/GlassIcon';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';

type Props = {
   photo: any;
   title: string;
   descs: string[];
   contentClassname?: string;
   optionBtns?: JSX.Element[];
};

const Hero = ({ photo, title, descs, contentClassname, optionBtns }: Props) => {
   if (!photo) return <>Loading...</>;
   return (
      <div className={style['hero-wrap']}>
         <img src={photo?.urls.regular} alt={photo?.description!} className={style['hero-banner']} />
         <div className={style['overlay']}></div>
         <div className={`${style['hero-content']} ${contentClassname}`}>
            <h1 className={style['title']}>{title}</h1>
            {descs.map((desc, index) => (
               <span className={style['hero-desc']} key={index}>
                  {desc}
               </span>
            ))}
            <div id='form-custom' style={{ width: '100%' }}>
               <div className={style['form-search']}>
                  <GlassIcon width={'24'} height={'24'} className={style['form-icon']} />
                  <Search placeholder='Search high-resolution images' />
               </div>
               <div className={style['hero-recomend']}>
                  <span>Trending: </span>
                  <Link to='/'>flower,</Link>
                  <Link to='/'>love,</Link>
                  <Link to='/'>wallpapers,</Link>
                  <Link to='/'>backgrounds</Link>
               </div>
            </div>
            {optionBtns}
         </div>
         <div className={style['user-wrap']}>
            <span className={style['text-wrap']}>
               <span style={{ cursor: 'zoom-in' }} className={style['text-white']}>
                  photo
               </span>
               <span className={style['text-gray']}>by</span>{' '}
               <span style={{ cursor: 'pointer' }} className={style['text-white']}>
                  {' '}
                  {photo?.user.name}
               </span>
            </span>
         </div>
         <div className={style['lisence']}>
            <span className={style['text-gray']}>Read more about the</span>{' '}
            <span className={style['text-white']}>Unsplash Lisence</span>
         </div>
      </div>
   );
};

export default React.memo(Hero);
