import { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { instanceServer } from '../../config/unsplash_instance';
import style from './UserProfile.module.scss';
import Button from '../../components/Button/Button';
import EmailIcon from '../../assets/icons/Email';
import DotIcon from '../../assets/icons/Dot';
import Location from '../../assets/icons/Location';
import Tag from '../../components/Tag/Tag';
import TabTopic, { TopicParams } from '../../components/TabTopic/TabTopic';
import PhotoIcon from '../../assets/icons/PhotoIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import SomePictures from '../../assets/icons/SomePictures';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Modal from '../../components/Modal/Modal';

const UserProfile = () => {
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   const [user, setUser] = useState<any>();
   const { username } = useParams();
   const navigate = useNavigate();
   const headRef = useRef<HTMLDivElement>(null);
   const tabRef = useRef<HTMLDivElement>(null);
   const miniProfileRef = useRef<HTMLDivElement>(null);
   const fakeTopics: TopicParams[] = [
      {
         slug: `/user/${user?.username}`,
         id: 'adsadsad',
         icon: <PhotoIcon width={'18'} height={'18'} />,
         title: 'Photos',
         total: user?.total_photos
      },
      {
         slug: `/user/${user?.username}/likes`,
         id: 'adsadsad2',
         icon: <HeartIcon width={'18'} height={'18'} />,
         title: 'Likes',
         total: user?.total_likes
      },
      {
         slug: `/user/${user?.username}/collections`,
         id: 'adsadsad3',
         icon: <SomePictures width={'18'} height={'18'} />,
         title: 'Collections',
         total: user?.total_collections
      }
   ];
   useEffect(() => {
      (async () => {
         try {
            const res = await instanceServer.users.get({ username: username! });
            setUser(res.response);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [username]);
   const handleCheckLocation = (path: string, slug: string) => {
      return path === slug;
   };
   useEffect(() => {
      const handleScroll = () => {
         if (
            miniProfileRef.current &&
            document.documentElement.scrollTop >= headRef.current?.clientHeight! &&
            tabRef.current
         ) {
            tabRef.current.style.position = 'fixed';
            tabRef.current.style.top = '0px';
            miniProfileRef.current.style.display = 'flex';
         } else if (miniProfileRef.current && tabRef.current) {
            tabRef.current.style.position = 'relative';
            miniProfileRef.current.style.display = 'none';
         }
      };
      document.addEventListener('scroll', handleScroll);

      return () => {
         document.removeEventListener('scroll', handleScroll);
      };
   }, []);
   const handleNavigate = (value: string) => {
      const characters = location.pathname.split('/');
      characters.pop();
      const formatPath = '/s/photos/' + value;
      navigate(formatPath);
   };
   return (
      <div className={style['wrapper']}>
         <div style={{ width: '100%', position: 'fixed', zIndex: '4' }}>
            <Header />
         </div>
         <div className={style['head-wrap']} ref={headRef}>
            <div className={style['profile-block']}>
               <div className={style['avatar-wrap']}>
                  <img src={user?.profile_image.large} alt='desc' />
               </div>
               <div className={style['info-wrap']}>
                  <div className={style['actions']}>
                     <h1>{user?.name}</h1>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Button className={style['btn-action']}>
                           <EmailIcon width={'18'} height={'18'} />
                        </Button>
                        <Button className={style['btn-action']}>
                           <DotIcon width={'18'} height={'18'} />
                        </Button>
                     </div>
                  </div>
                  <p className={style['bio']}>{user?.bio}</p>
                  <p className={style['link']}>
                     <Location width={'18'} height={'18'} />
                     <span>{user?.location}</span>
                  </p>
                  <p>Interests</p>
                  <div className={style['tag-wrap']}>
                     <Tag tags={user?.tags?.custom!} onClick={(value) => handleNavigate(value)} />
                  </div>
               </div>
            </div>
         </div>
         <div className={style['tab']} ref={tabRef}>
            {' '}
            <TabTopic list={fakeTopics} checkLocation={handleCheckLocation} />
            <div className={style['hide-profile']} ref={miniProfileRef}>
               <img src={user?.profile_image.small} alt={user?.username} />
               <span>{user?.name}</span>
               <div className={style['actions']}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <Button className={style['btn-action']}>
                        <EmailIcon width={'18'} height={'18'} />
                     </Button>
                     <Button className={style['btn-action']}>
                        <DotIcon width={'18'} height={'18'} />
                     </Button>
                  </div>
               </div>
            </div>
         </div>
         <Outlet />
         {openModal && <Modal />}
      </div>
   );
};
// lam tiep cac trang con trong profile user
export default UserProfile;
