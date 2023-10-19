import { Link } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';

import GlassIcon from '../../assets/icons/GlassIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
import style from './Header.module.scss';
import BarIcon from '../../assets/icons/BarIcon';
import Search from '../Search/Search';
import Dropdown from '../Dropdown/Dropdown';
import { useClickOutside } from '../../hooks/useClickOutside';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';

const Header = () => {
   const [openMenu, setOpenMenu] = useState<boolean>(false);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const { pushPath } = useContext(PhotoContext) as IPhotoState;
   useClickOutside(buttonRef, () => setOpenMenu(false));
   const handleOpenMenu = () => {
      setOpenMenu((prev) => !prev);
   };
   return (
      <header className={style['wrapper']}>
         <div className={style['block-top']}>
            <Link
               to='/'
               onClick={() => {
                  pushPath('');
                  window.scrollTo(0, 0);
               }}
            >
               <LogoIcon />
            </Link>
            <div className={style['form-search']}>
               <GlassIcon width={'20'} height={'20'} className={style['form-icon']} />
               <Search placeholder='Search high-resolution images' />
            </div>
            <div className={style['top-nav']}>
               <span className={style['nav-link']}>Explore</span>
               <span className={style['nav-link']}>Advertise</span>
               <span className={style['nav-link-plus']}>Unsplash+</span>
            </div>
            <div className={style['shrink']}></div>
            <div className={style['top-auth']}>
               <span className={style['nav-link']}>Log in</span>
               <button className={style['submit-btn']} type='button'>
                  Submit a photo
               </button>
               <button
                  onClick={handleOpenMenu}
                  type='button'
                  style={{ position: 'relative', zIndex: '5' }}
                  ref={buttonRef}
               >
                  {' '}
                  <BarIcon className={style['bar-icon']} />
                  {openMenu && <Dropdown />}
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
