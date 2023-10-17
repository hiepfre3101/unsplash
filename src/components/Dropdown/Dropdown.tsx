import React from 'react';
import style from './Dropdown.module.scss';
import Company from '../../assets/icons/Company';
import LayoutIcon from '../../assets/icons/LayoutIcon';
import Communication from '../../assets/icons/Communication';
import { Link } from 'react-router-dom';

type IMenu = {
   title: string;
   icon: React.ReactElement;
   children: {
      title: string;
      link: string;
   }[];
};
const menuData: IMenu[] = [
   {
      title: 'Company',
      icon: <Company />,
      children: [
         {
            title: 'About',
            link: 'about'
         },
         {
            title: 'History',
            link: 'History'
         },
         {
            title: 'Join the team',
            link: 'Join the team'
         },
         {
            title: 'Contact us',
            link: 'Contact us'
         },
         {
            title: 'Help center',
            link: 'Help center'
         },
         {
            title: 'Contact us',
            link: 'contact-us'
         },
         {
            title: 'Press',
            link: 'press'
         }
      ]
   },
   {
      title: 'Product',
      icon: <LayoutIcon />,
      children: [
         {
            title: 'Developer/API',
            link: 'dev'
         },
         {
            title: 'Unsplash dataset',
            link: 'dataset'
         },
         {
            title: 'Unsplash for iOS',
            link: 'ios'
         },
         {
            title: 'Apps & Plugins',
            link: 'app'
         }
      ]
   },
   {
      title: 'Community',
      icon: <Communication />,
      children: [
         {
            title: 'Become a Contributor',
            link: 'about'
         },
         {
            title: 'Topics',
            link: 'topics'
         },
         {
            title: 'Collections',
            link: 'collections'
         },
         {
            title: 'Trends',
            link: 'trends'
         },
         {
            title: 'Unsplash Awards',
            link: 'awards'
         }
      ]
   }
];

const Dropdown = () => {
   return (
      <div className={style['wrapper']}>
         <div className={style['body']}>
            {menuData.map((menu, index) => (
               <div className={style['body-column']} key={index}>
                  <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '15px' }}>
                     {menu.icon}
                     <strong>{menu.title}</strong>
                  </div>
                  <div className={style['list']}>
                     {menu.children.map((child, index) => (
                        <Link to={child.link} className={style['nav-link']} key={index}>
                           {child.title}
                        </Link>
                     ))}
                  </div>
               </div>
            ))}
         </div>
         <div className={style['footer']}>
            <div className={style['footer-left']}>
               <span className={style['nav-link']}>Lisence</span>
               <span className={style['nav-link']}>Privacy Policy</span>
               <span className={style['nav-link']}>Terms</span>
               <span className={style['nav-link']}>Security</span>
            </div>
         </div>
      </div>
   );
};

export default Dropdown;
