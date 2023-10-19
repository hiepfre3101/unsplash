import { useContext, useEffect, useRef, useState } from 'react';
import style from './Modal.module.scss';
import XIcon from '../../assets/icons/XIcon';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import ArrowRight from '../../assets/icons/ArrowRight';
import Portal from '../Portal/Portal';
import PlusIcon from '../../assets/icons/PlusIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import Share from '../../assets/icons/Share';
import InfoIcon from '../../assets/icons/InfoIcon';
import Location from '../../assets/icons/Location';
import CameraIcon from '../../assets/icons/CameraIcon';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import { instanceServer } from '../../config/unsplash_instance';
import Body from '../Body/Body';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Loading from '../Loading/Loading';
import { useClickOutside } from '../../hooks/useClickOutside';
import ImageZoom from '../ImageZoom/ImageZoom';
import { Random } from 'unsplash-js/dist/methods/photos/types';
import { Link, useNavigate } from 'react-router-dom';
import ArrDownThin from '../../assets/icons/ArrDownThin';
import DropAntd from '../DropAntd/DropAntd';

const Modal = () => {
   const {
      photo: singlePhoto,
      openModal,
      triggerModal,
      idPhoto,
      handleSetPhoto,
      listPhoto,
      triggerReloadModal,
      pushPath
   } = useContext(PhotoContext) as IPhotoState;
   const [loading, setLoading] = useState<boolean>(false);
   const [relatePhotos, setRelatePhotos] = useState<any>([]);
   const navigate = useNavigate();
   const modalRef = useRef(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const headRef = useRef<HTMLDivElement>(null);
   useClickOutside(modalRef, () => {
      triggerModal(false);
   });
   useEffect(() => {
      const handleScroll = () => {
         if (!headRef.current || !containerRef.current) return;
         const paddingTop = 20;
         const imageWrapperHeight = 1000;
         if (containerRef.current.scrollTop >= paddingTop && containerRef.current.scrollTop < imageWrapperHeight) {
            headRef.current.style.position = 'fixed';
            headRef.current.style.top = '0';
            headRef.current.style.margin = 'auto';
            headRef.current.style.width = 'calc(90% - 40px)';
            headRef.current.style.backgroundColor = 'white';
         } else if (containerRef.current.scrollTop >= imageWrapperHeight) {
            headRef.current.style.position = 'static';
         } else {
            headRef.current.style.position = 'static';
            headRef.current.style.margin = 'auto';
            headRef.current.style.width = '100%';
         }
      };
      containerRef.current?.addEventListener('scroll', handleScroll);
      return () => {
         return containerRef.current?.removeEventListener('scroll', handleScroll);
      };
   });
   useEffect(() => {
      if (!openModal) return;
      (async () => {
         try {
            setLoading(true);
            const res = await instanceServer.photos.get({ photoId: idPhoto });
            handleSetPhoto(res.response);
            setLoading(false);
         } catch (error) {
            setLoading(false);
            console.log(error);
         }
      })();
   }, [idPhoto, openModal]);
   useEffect(() => {
      if (!openModal) return;
      (async () => {
         const collectionIds = singlePhoto?.related_collections.results.map((result: any) => result.id);
         try {
            const res = await instanceServer.photos.getRandom({
               collectionIds: collectionIds,
               count: 10
            });
            setRelatePhotos(res.response as Random[]);
            // console.log('run');
         } catch (error) {
            console.log(error);
         }
      })();
   }, [singlePhoto, openModal]);
   useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
         document.body.style.overflow = 'auto';
      };
   }, [openModal]);

   const handleCalDate = (isoFormat: string) => {
      const publishDate = new Date(isoFormat);
      const presentDate = new Date();
      return Math.floor((presentDate.getTime() - publishDate.getTime()) / (1000 * 3600 * 24));
   };
   const nextImage = () => {
      if (!singlePhoto) return;
      const currIndex = listPhoto.indexOf(listPhoto.find((item: any) => item.id === singlePhoto.id)!);
      if (currIndex !== listPhoto.length - 1) {
         const nextPhoto = listPhoto[currIndex + 1];
         triggerReloadModal(nextPhoto.id);
      } else {
         triggerReloadModal(listPhoto[0].id);
      }
   };
   const prevImage = () => {
      if (!singlePhoto) return;
      const currIndex = listPhoto.indexOf(listPhoto.find((item: any) => item.id === singlePhoto.id)!);
      if (currIndex !== 0) {
         const nextPhoto = listPhoto[currIndex - 1];
         triggerReloadModal(nextPhoto.id);
      } else {
         triggerReloadModal(listPhoto[0].id);
      }
   };
   return (
      <Portal target='modal'>
         <div className={style['wrapper']}>
            <button
               type='button'
               onClick={() => {
                  triggerModal(false);
               }}
            >
               <XIcon className={style['close-btn']} />
            </button>

            <div className={style['main-wrapper']} ref={containerRef}>
               <div className={style['modal-block']} ref={modalRef}>
                  {loading ? (
                     <Loading screen='large' />
                  ) : (
                     <div>
                        <div className={style['head']} ref={headRef}>
                           <Link
                              to={'/user/' + singlePhoto?.user.username}
                              onClick={() => {
                                 triggerModal(false);
                                 window.scrollTo(0, 0);
                                 pushPath('/user/' + singlePhoto?.user.username);
                              }}
                              className={style['profile-wrapper']}
                           >
                              <img
                                 src={singlePhoto?.user.profile_image.medium}
                                 alt={singlePhoto?.user.name}
                                 className={style['profile-img']}
                              />
                              <span className={style['profile-name']}>{singlePhoto?.user.name}</span>
                           </Link>
                           <div className={style['actions']}>
                              <button type='button' className={`${style['head-btn']}`}>
                                 <PlusIcon className={style['overlay-icon']} />
                              </button>
                              <button type='button' className={style['head-btn']}>
                                 <HeartIcon className={style['overlay-icon']} />
                              </button>
                              <div className={style['dowload-wrap']}>
                                 <a
                                    target='blank'
                                    download='exp.jpg'
                                    href={singlePhoto?.links?.download + '&amp;force=true'}
                                 >
                                    <button type='button' className={style['dowload-btn']}>
                                       <span style={{ lineHeight: '24px' }}>Download free</span>
                                    </button>
                                 </a>
                                 <DropAntd
                                    direction='bottom'
                                    footer={
                                       <a
                                          href={singlePhoto?.links.download + '&amp;force=true'}
                                          className={style['foot-dropdown']}
                                       >
                                          <div className={style['option']}>
                                             <span style={{ color: 'black' }}>Original Size</span>
                                             <span
                                                style={{ color: '#a0a0a0' }}
                                             >{`(${singlePhoto?.width} x ${singlePhoto?.height})`}</span>
                                          </div>
                                       </a>
                                    }
                                    renderList={() => (
                                       <div className={style['body-dropdown']}>
                                          <a
                                             href={singlePhoto?.links.download + '&amp;force=true' + '&w=640'}
                                             className={style['option']}
                                          >
                                             <span style={{ color: 'black' }}>Small </span>
                                             <span style={{ color: '#a0a0a0' }}>(640 x 436)</span>
                                          </a>
                                          <a
                                             href={singlePhoto?.links.download + '&amp;force=true' + '&w=1920'}
                                             className={style['option']}
                                          >
                                             <span style={{ color: 'black' }}>Medium </span>
                                             <span style={{ color: '#a0a0a0' }}>(1920 x 1080)</span>
                                          </a>
                                          <a
                                             href={singlePhoto?.links.download + '&amp;force=true' + '&w=2400'}
                                             className={style['option']}
                                          >
                                             <span style={{ color: 'black' }}>Large </span>
                                             <span style={{ color: '#a0a0a0' }}>(2400 x 1600)</span>
                                          </a>
                                       </div>
                                    )}
                                 >
                                    <button className={`${style['dowload-btn2']}`}>
                                       <ArrDownThin />
                                    </button>
                                 </DropAntd>
                                 <button type='button' onClick={prevImage}>
                                    <ArrowLeft className={style['prev-btn']} width={'40'} height={'40'} />
                                 </button>
                                 <button type='button' onClick={nextImage}>
                                    <ArrowRight className={style['next-btn']} width={'40'} height={'40'} />
                                 </button>
                              </div>
                           </div>
                        </div>
                        <div className={style['image-wrap']}>
                           <ImageZoom src={singlePhoto?.urls.raw!} alt={singlePhoto?.description!} />
                        </div>
                        <div className={style['photo-info']}>
                           <div className={style['info-left']}>
                              <div className={style['info-item']}>
                                 <span className={style['text-gray']}>Views</span>
                                 <span className={style['text-black']}>{singlePhoto?.views}</span>
                              </div>
                              <div className={style['info-item']}>
                                 <span className={style['text-gray']}>Likes</span>
                                 <span className={style['text-black']}>{singlePhoto?.likes}</span>
                              </div>
                              <div className={style['info-item']}>
                                 <span className={style['text-gray']}>Downloads</span>
                                 <span className={style['text-black']}>{singlePhoto?.downloads || 0}</span>
                              </div>
                              <div className={style['info-item']}>
                                 <span className={style['text-gray']}>Color</span>
                                 <span
                                    style={{
                                       backgroundColor: singlePhoto?.color,
                                       width: '15px',
                                       height: '15px',
                                       display: 'block'
                                    }}
                                 ></span>
                              </div>
                           </div>
                           <div className={style['info-right']}>
                              <button type='button' className={style['head-btn']}>
                                 <Share className={style['overlay-icon']} width={'32'} height={'32'} />
                                 Share
                              </button>
                              <button type='button' className={style['head-btn']}>
                                 <InfoIcon className={style['overlay-icon']} width={'32'} height={'32'} />
                                 Info
                              </button>
                           </div>
                        </div>
                        <div className={style['author-info']}>
                           <div className={style['author-item']}>
                              <Location className={style['overlay-icon']} />
                              <span className={style['text-gray']}>
                                 {singlePhoto?.location.city || 'anywhere'},{' '}
                                 {singlePhoto?.location.country || 'anywhere'}
                              </span>
                           </div>
                           <div className={style['author-item']}>
                              <CameraIcon className={style['overlay-icon']} />
                              <span className={style['text-gray']}>{singlePhoto?.exif.name}</span>
                           </div>
                           <div className={style['author-item']}>
                              <CalendarIcon className={style['overlay-icon']} />
                              <span className={style['text-gray']}>
                                 Published {handleCalDate(singlePhoto?.created_at!)} days ago
                              </span>
                           </div>
                        </div>

                        <div className={style['tag-wrapper']}>
                           {singlePhoto &&
                              singlePhoto.tags.map((tag: any, index: number) => (
                                 <button
                                    className={style['tag']}
                                    key={index}
                                    onClick={() => {
                                       pushPath('/s/photos/' + tag.title);
                                       triggerModal(false);
                                       navigate('/s/photos/' + tag.title);
                                    }}
                                 >
                                    {tag.title}
                                 </button>
                              ))}
                        </div>

                        <div className={style['relate']}>
                           <Body type='limit' title='Relate Photos' photos={relatePhotos} />
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </Portal>
   );
};

export default Modal;
