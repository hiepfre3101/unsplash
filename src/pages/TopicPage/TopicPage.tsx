import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { instanceServer } from '../../config/unsplash_instance';
import { ITopic } from '../../interface/topic';
import Hero from '../../components/Hero/Hero';
import style from './TopicPage.module.scss';
import { IPhotoState, PhotoContext } from '../../context/PhotoContext';
import Body from '../../components/Body/Body';
import Modal from '../../components/Modal/Modal';
import useListPhoto from '../../hooks/useListPhoto';
import { TopicIdOrSlug } from 'unsplash-js/dist/methods/topics';
import { PaginationParams } from 'unsplash-js/dist/types/request';

const TopicPage = () => {
   const { topic } = useParams();
   const [topicData, setTopicData] = useState<ITopic>();
   const { openModal } = useContext(PhotoContext) as IPhotoState;
   const { handleSetPage } = useListPhoto<TopicIdOrSlug & PaginationParams>({
      api: instanceServer.topics.getPhotos,
      params: { topicIdOrSlug: topic!, perPage: 20 },
      pathname: topic?.replace('/', '')!
   });
   const SubmitBtn = (
      <button className={style['btn-submit']}>
         Submit to <strong>{topicData?.title}</strong>
      </button>
   );
   useEffect(() => {
      if (topic === '' || !topic) return;
      (async () => {
         try {
            const res = await instanceServer.topics.get({ topicIdOrSlug: topic! });
            setTopicData(res.response as ITopic);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [topic]);

   return (
      <div className={style['wrapper']}>
         <Hero
            contentClassname={style['content-hero']}
            descs={[topicData?.description!]}
            photo={topicData?.cover_photo!}
            title={topicData?.title!}
            optionBtns={[SubmitBtn]}
         />
         <Body displayColabs={topicData?.top_contributors} type='infinite' loadMore={handleSetPage} />
         {openModal && <Modal />}
      </div>
   );
};

export default TopicPage;
