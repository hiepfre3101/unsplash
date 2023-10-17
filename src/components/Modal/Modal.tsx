import { useContext, useEffect, useRef, useState } from 'react';
import { IPhoto } from '../../interface/photo';
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

const Modal = () => {
   const {
      photo: singlePhoto,
      openModal,
      triggerModal,
      idPhoto,
      handleSetPhoto,
      listPhoto,
      triggerReloadModal
   } = useContext(PhotoContext) as IPhotoState;
   const [loading, setLoading] = useState<boolean>(false);
   const [relatePhotos, setRelatePhotos] = useState<IPhoto[]>([]);
   const modalRef = useRef(null);
   useClickOutside(modalRef, () => {
      triggerModal(false);
   });
   useEffect(() => {
      if (!openModal) return;
      (async () => {
         try {
            setLoading(true);
            const res = await instanceServer.photos.get({ photoId: idPhoto });
            handleSetPhoto(res.response as IPhoto);
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
         const collectionIds = singlePhoto?.related_collections.results.map((result) => result.id);
         try {
            const res = await instanceServer.photos.getRandom({
               collectionIds: collectionIds,
               count: 10
            });
            setRelatePhotos(res.response);
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
      const currIndex = listPhoto.indexOf(listPhoto.find((item) => item.id === singlePhoto.id)!);
      if (currIndex !== listPhoto.length - 1) {
         const nextPhoto = listPhoto[currIndex + 1];
         triggerReloadModal(nextPhoto.id);
      } else {
         triggerReloadModal(listPhoto[0].id);
      }
   };
   const prevImage = () => {
      if (!singlePhoto) return;
      const currIndex = listPhoto.indexOf(listPhoto.find((item) => item.id === singlePhoto.id)!);
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

            <div className={style['main-wrapper']}>
               <div className={style['modal-block']} ref={modalRef}>
                  {loading ? (
                     <Loading screen='large' />
                  ) : (
                     <div>
                        <button type='button' onClick={prevImage}>
                           <ArrowLeft className={style['prev-btn']} width={'40'} height={'40'} />
                        </button>
                        <button type='button' onClick={nextImage}>
                           <ArrowRight className={style['next-btn']} width={'40'} height={'40'} />
                        </button>
                        <div className={style['head']}>
                           <div className={style['profile-wrapper']}>
                              <img
                                 src={singlePhoto?.user.profile_image.medium}
                                 alt={singlePhoto?.user.name}
                                 className={style['profile-img']}
                              />
                              <span className={style['profile-name']}>{singlePhoto?.user.name}</span>
                           </div>
                           <div className={style['actions']}>
                              <button type='button' className={`${style['head-btn']}`}>
                                 <PlusIcon className={style['overlay-icon']} />
                              </button>
                              <button type='button' className={style['head-btn']}>
                                 <HeartIcon className={style['overlay-icon']} />
                              </button>
                              <a
                                 target='blank'
                                 download='exp.jpg'
                                 href={singlePhoto?.links?.download + '&amp;force=true'}
                              >
                                 <button type='button' className={style['head-btn']}>
                                    <span style={{ lineHeight: '24px' }}>Download</span>
                                 </button>
                              </a>
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
                              singlePhoto.tags.map((tag, index) => (
                                 <button className={style['tag']} key={index}>
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
